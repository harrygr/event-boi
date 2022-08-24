# EventBoi

EventBoi is a super-simple, typesafe event bus.

It allows subscribing to pre-defined events and their associated payloads.

## Installation

```bash
npm install event-boi
```

```bash
yarn add event-boi
```

## Usage

`event-boi` is designed to be used with TypeScript (although there's nothing stopping you from using it in plain JavaScript). The possible events should be declared when creating an event bus instance. The TS compiler will then ensure that only events that exist can be published and subscribed to and that the payloads for each event is correct.

```ts
import createEventBus from "event-boi";

// if using TypeScript you must pre-define the events and their payloads.
interface Events {
  game_played: { result: "win" | "loss" };
  message_sent: string;
}

const MyEventBus = createEventBus<Events>();

const unsubscribe = MyEventBus.subscribe("message_sent", (message) => {
  console.log(`A message was sent with the content "${message}"`);
});

// later...

MyEventBus.publish("message_sent", "Hello, world");
// logs: A message was sent with the content "Hello, world"

// to unsubscribe just call the `unsubscribe` function returned from the `subscribe` method:
unsubscribe();
```
