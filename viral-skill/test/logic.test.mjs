import test from "node:test";
import assert from "node:assert/strict";

import { createViralSkillKit, VIRAL_MODES } from "../logic.mjs";

test("builds AI topic kit with expected structure", () => {
  const kit = createViralSkillKit({
    topic: "用Claude做内容选题",
    mode: "xhs",
  });

  assert.equal(kit.mode, "xhs");
  assert.match(kit.title, /Claude|内容选题/);
  assert.equal(kit.altTitles.length, 3);
  assert.ok(kit.steps.length >= 6);
  assert.match(kit.hook, /第1句：/);
  assert.match(kit.steps[0], /封面标题：/);
  assert.match(kit.deliveryTip, /图文/);
  assert.equal(kit.modeLabel, VIRAL_MODES.xhs.label);
  assert.equal(kit.checklist.length, 3);
});

test("falls back to defaults for unknown mode and blank topic", () => {
  const kit = createViralSkillKit({
    topic: " ",
    mode: "unknown",
  });

  assert.equal(kit.mode, "xhs");
  assert.equal(kit.topic, "这个主题");
  assert.match(kit.close, /收藏|这个主题/);
});

test("different modes produce clearly different headlines and delivery tips", () => {
  const xhs = createViralSkillKit({ topic: "AI做简历优化", mode: "xhs" });
  const video = createViralSkillKit({ topic: "AI做简历优化", mode: "video" });
  const knowledge = createViralSkillKit({ topic: "AI做简历优化", mode: "knowledge" });

  assert.notEqual(xhs.title, video.title);
  assert.notEqual(video.title, knowledge.title);
  assert.match(video.hook, /第1句：/);
  assert.match(video.steps[0], /镜头1/);
  assert.match(video.deliveryTip, /口播|45 秒/);
  assert.match(knowledge.steps[0], /开场定义/);
  assert.match(knowledge.modeDescription, /知识类表达|误区/);
});

test("variant can remix title and hook", () => {
  const first = createViralSkillKit({
    topic: "普通人如何学 Claude Code",
    mode: "knowledge",
    variant: 0,
  });
  const second = createViralSkillKit({
    topic: "普通人如何学 Claude Code",
    mode: "knowledge",
    variant: 1,
  });

  assert.notEqual(first.title, second.title);
  assert.notEqual(first.hook, second.hook);
});
