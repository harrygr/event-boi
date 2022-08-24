import { it, expect, vi } from "vitest";
import { createEventBus } from "./eventBus";

interface EventRegistry {
  game_played: { result: "win" | "loss" };
  thing_happened: undefined;
}

it("subsribes and pubs for an event", () => {
  const handler = vi.fn();
  const EventBus = createEventBus<EventRegistry>();

  const unsubscribe = EventBus.subscribe("game_played", (payload) =>
    handler(payload)
  );

  EventBus.publish("game_played", { result: "win" });

  expect(handler).toHaveBeenCalledWith({ result: "win" });

  handler.mockClear();
  unsubscribe();

  EventBus.publish("game_played", { result: "loss" });

  expect(handler).not.toHaveBeenCalled();
});

const E = createEventBus();
