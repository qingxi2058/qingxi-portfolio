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
  assert.equal(kit.altTitles.length, 2);
  assert.equal(kit.steps.length, 3);
  assert.match(kit.hook, /先给结果/);
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
