const json = (res, status, payload) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(payload));
};

const readContent = (content) => {
  if (typeof content === 'string') {
    return content;
  }

  if (Array.isArray(content)) {
    return content
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }

        if (item?.type === 'text') {
          return item.text || '';
        }

        return '';
      })
      .join('\n');
  }

  return '';
};

const parseJsonText = (rawText) => {
  const cleanedText = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  return JSON.parse(cleanedText);
};

const normalizeArray = (value) => (Array.isArray(value) ? value : []);

const safeString = (value, fallback = '') => (typeof value === 'string' ? value.trim() : fallback);

const withId = (items, keyPrefix) =>
  normalizeArray(items).map((item, index) => ({
    id: safeString(item?.id, `${keyPrefix}-${index + 1}`),
    ...item,
  }));

const buildFallbackScriptText = (data) => {
  const sceneText = withId(data.scriptScenes, 'scene')
    .map((scene, index) => {
      return [
        `场景${index + 1}：${safeString(scene.title, `镜头${index + 1}`)}`,
        `地点：${safeString(scene.location, '待定')}`,
        safeString(scene.description, '待补充镜头描述'),
        safeString(scene.dialogue, '待补充关键对白'),
      ].join('\n');
    })
    .join('\n\n');

  return [
    `${safeString(data.title, '未命名短剧')}`,
    '',
    `一句话卖点：${safeString(data.logline, '待补充')}`,
    '',
    sceneText,
  ].join('\n');
};

const normalizeProject = (data, request) => {
  const characters = withId(data.characters, 'character').map((character) => ({
    id: safeString(character.id),
    name: safeString(character.name, '未命名角色'),
    age: safeString(character.age, '未知年龄'),
    occupation: safeString(character.occupation, '待定职业'),
    personality: safeString(character.personality, '待补充性格'),
    background: safeString(character.background, '待补充背景'),
    appearance: safeString(character.appearance, '待补充外貌'),
    relationships: normalizeArray(character.relationships).map((item) => safeString(item)).filter(Boolean),
  }));

  const episodeBeats = normalizeArray(data.episodeBeats).map((beat, index) => ({
    episode: Number(beat?.episode) || index + 1,
    title: safeString(beat?.title, `第${index + 1}集`),
    summary: safeString(beat?.summary, '待补充剧情推进'),
    cliffhanger: safeString(beat?.cliffhanger, '待补充吊点'),
  }));

  const scriptScenes = withId(data.scriptScenes, 'scene').map((scene, index) => ({
    id: safeString(scene.id, `scene-${index + 1}`),
    title: safeString(scene.title, `场景${index + 1}`),
    description: safeString(scene.description, '待补充镜头描述'),
    duration: safeString(scene.duration, '0:30'),
    location: safeString(scene.location, '待定场景'),
    characters: normalizeArray(scene.characters).map((item) => safeString(item)).filter(Boolean),
    shotType: safeString(scene.shotType, '中景'),
    cameraMovement: safeString(scene.cameraMovement, '固定'),
    lighting: safeString(scene.lighting, '自然光'),
    sound: safeString(scene.sound, '环境声'),
    dialogue: safeString(scene.dialogue, '待补充关键对白'),
    notes: safeString(scene.notes, '待补充拍摄备注'),
  }));

  return {
    title: safeString(data.title, '未命名短剧'),
    genreLabel: safeString(data.genreLabel, request.genre || '短剧'),
    durationLabel: safeString(data.durationLabel, request.duration || '3分钟'),
    keywords: normalizeArray(data.keywords).map((item) => safeString(item)).filter(Boolean),
    creativity: Number(data.creativity) || Number(request.creativity) || 5,
    logline: safeString(data.logline, '待补充一句话卖点'),
    hook: safeString(data.hook, '待补充开场钩子'),
    tone: safeString(data.tone, '情绪待定'),
    characters,
    episodeBeats,
    scriptScenes,
    nextEpisodeHook: safeString(data.nextEpisodeHook, '待补充下一集吊点'),
    fullScriptText: safeString(data.fullScriptText, buildFallbackScriptText({ ...data, scriptScenes })),
    generatedAt: new Date().toISOString(),
  };
};

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return json(res, 405, { success: false, error: '只支持 POST 请求', code: 'METHOD_NOT_ALLOWED' });
  }

  let request = {};

  try {
    request = typeof req.body === 'string'
      ? JSON.parse(req.body || '{}')
      : (typeof req.body === 'object' ? req.body : {});
  } catch {
    return json(res, 400, { success: false, error: '请求体不是合法 JSON', code: 'INVALID_JSON' });
  }
  const providerConfig = request.providerConfig || {};
  const apiKey = (providerConfig.apiKey || '').trim();
  const baseUrl = (providerConfig.baseUrl || 'https://api.openai.com/v1').trim().replace(/\/$/, '');
  const model = (providerConfig.model || 'gpt-4.1-mini').trim();

  if (!apiKey) {
    return json(res, 400, {
      success: false,
      error: '这里默认使用你自己的 API。请先在创作页展开“真实生成设置”，填入你自己的 Key 后再生成。',
      code: 'MISSING_MODEL_CONFIG',
    });
  }

  const prompt = [
    '你是资深短剧编剧和短视频制片统筹。',
    '请根据用户输入，生成一份适合中文短剧创作的结果，必须只返回 JSON，不要返回解释。',
    '要求：',
    '1. 内容必须真实可拍，不要空泛概念，不要像课程示例。',
    '2. 角色要彼此有关系、目标和阻力，不能只写性格标签。',
    '3. 必须给出三集推进、第1集正文、可直接用的分镜草稿。',
    '4. 分镜草稿里的每条镜头都要有标题、地点、时长、人物、镜头类型、机位运动、灯光、声音、关键对白、备注。',
    '5. 优先使用低成本、现实可搭建的场景；每集只推进一个关键决定。',
    '6. 除非用户关键词明确要求，否则不要强行使用失忆、车祸、总裁告白、突然绝症、天降遗产这类俗套桥段。',
    '7. 第1集正文必须像真正拍摄稿，包含场景名、动作、对白和转折，不要只有剧情摘要。',
    '8. 所有文案都用简体中文。',
    'JSON 结构：',
    JSON.stringify({
      title: '短剧标题',
      genreLabel: '现代都市/古装言情/悬疑推理等',
      durationLabel: '1分钟/3分钟/5分钟/10分钟',
      keywords: ['关键词1', '关键词2'],
      creativity: 7,
      logline: '一句话卖点',
      hook: '开场钩子',
      tone: '情绪基调',
      characters: [
        {
          id: 'character-1',
          name: '角色名',
          age: '年龄',
          occupation: '职业',
          personality: '性格',
          background: '背景',
          appearance: '外貌',
          relationships: ['和谁是什么关系', '和谁有什么旧事'],
        },
      ],
      episodeBeats: [
        { episode: 1, title: '第1集标题', summary: '第1集推进', cliffhanger: '第1集吊点' },
        { episode: 2, title: '第2集标题', summary: '第2集推进', cliffhanger: '第2集吊点' },
        { episode: 3, title: '第3集标题', summary: '第3集推进', cliffhanger: '第3集吊点' },
      ],
      scriptScenes: [
        {
          id: 'scene-1',
          title: '镜头标题',
          description: '镜头描述',
          duration: '0:30',
          location: '地点',
          characters: ['角色A', '角色B'],
          shotType: '中景',
          cameraMovement: '推镜头',
          lighting: '自然光',
          sound: '环境声',
          dialogue: '关键对白',
          notes: '拍摄备注',
        },
      ],
      nextEpisodeHook: '下一集吊点',
      fullScriptText: '第1集完整正文',
    }, null, 2),
  ].join('\n');

  const userInput = [
    `剧本类型：${request.genre || 'modern'}`,
    `预计时长：${request.duration || '3min'}`,
    `创意程度：${request.creativity || 5}/10`,
    `关键词：${request.keywords || '时间胶囊、咖啡馆、反转、真相'}`,
  ].join('\n');

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.9,
        max_tokens: 2600,
        response_format: { type: 'json_object' },
        messages: [
          { role: 'system', content: prompt },
          { role: 'user', content: userInput },
        ],
      }),
    });

    const payload = await response.json();

    if (!response.ok) {
      const message = payload?.error?.message || '模型调用失败';
      return json(res, response.status, { success: false, error: message, code: 'MODEL_REQUEST_FAILED' });
    }

    const content = readContent(payload?.choices?.[0]?.message?.content);
    const parsed = parseJsonText(content);
    const normalized = normalizeProject(parsed, request);

    return json(res, 200, {
      success: true,
      data: normalized,
    });
  } catch (error) {
    return json(res, 500, {
      success: false,
      error: error instanceof Error ? error.message : '生成时发生未知错误',
      code: 'UNEXPECTED_ERROR',
    });
  }
};
