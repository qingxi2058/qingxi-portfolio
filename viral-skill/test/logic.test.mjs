import test from "node:test";
import assert from "node:assert/strict";

import { createViralSkillKit } from "../logic.mjs";

test("builds AI topic kit with expected structure", () => {
  const kit = createViralSkillKit({
    topic: "用Claude做内容选题",
    mode: "xhs",
  });

  assert.equal(kit.mode, "xhs");
  assert.match(kit.title, /Claude|内容选题/);
  assert.equal(kit.altTitles.length, 3);
  assert.equal(kit.steps.length, 3);
  assert.match(kit.hook, /先给结果/);
  assert.match(kit.deliveryTip, /图文/);
  assert.match(kit.summary, /收藏型图文/);
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
  assert.match(video.deliveryTip, /口播|45 秒/);
  assert.match(knowledge.summary, /知识表达/);
});
