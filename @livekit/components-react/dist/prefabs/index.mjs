var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/prefabs/Chat.tsx
import { setupChat } from "@livekit/components-core";
import * as React8 from "react";

// src/context/layout-context.ts
import { PIN_DEFAULT_STATE, WIDGET_DEFAULT_STATE } from "@livekit/components-core";
import * as React from "react";

// src/context/chat-context.ts
function chatReducer(state, action) {
  if (action.msg === "show_chat") {
    return __spreadProps(__spreadValues({}, state), { showChat: true });
  } else if (action.msg === "hide_chat") {
    return __spreadProps(__spreadValues({}, state), { showChat: false });
  } else if (action.msg === "toggle_chat") {
    return __spreadProps(__spreadValues({}, state), { showChat: !state.showChat });
  } else {
    return __spreadValues({}, state);
  }
}

// src/context/pin-context.ts
function pinReducer(state, action) {
  if (action.msg === "set_pin") {
    return [action.trackReference];
  } else if (action.msg === "clear_pin") {
    return [];
  } else {
    return __spreadValues({}, state);
  }
}

// src/context/layout-context.ts
var LayoutContext = React.createContext(void 0);
function useLayoutContext() {
  const layoutContext = React.useContext(LayoutContext);
  if (!layoutContext) {
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  }
  return layoutContext;
}
function useEnsureLayoutContext(layoutContext) {
  const layout = useMaybeLayoutContext();
  layoutContext != null ? layoutContext : layoutContext = layout;
  if (!layoutContext) {
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  }
  return layoutContext;
}
function useCreateLayoutContext() {
  const [pinState, pinDispatch] = React.useReducer(pinReducer, PIN_DEFAULT_STATE);
  const [widgetState, widgetDispatch] = React.useReducer(chatReducer, WIDGET_DEFAULT_STATE);
  return {
    pin: { dispatch: pinDispatch, state: pinState },
    widget: { dispatch: widgetDispatch, state: widgetState }
  };
}
function useEnsureCreateLayoutContext(layoutContext) {
  const [pinState, pinDispatch] = React.useReducer(pinReducer, PIN_DEFAULT_STATE);
  const [widgetState, widgetDispatch] = React.useReducer(chatReducer, WIDGET_DEFAULT_STATE);
  return layoutContext != null ? layoutContext : {
    pin: { dispatch: pinDispatch, state: pinState },
    widget: { dispatch: widgetDispatch, state: widgetState }
  };
}
function useMaybeLayoutContext() {
  return React.useContext(LayoutContext);
}

// src/context/participant-context.ts
import * as React3 from "react";

// src/context/track-context.ts
import * as React2 from "react";
var TrackContext = React2.createContext(void 0);
function useMaybeTrackContext() {
  return React2.useContext(TrackContext);
}

// src/context/participant-context.ts
var ParticipantContext = React3.createContext(void 0);
function useMaybeParticipantContext() {
  return React3.useContext(ParticipantContext);
}
function useEnsureParticipant(participant) {
  var _a;
  const context = useMaybeParticipantContext();
  const trackContext = useMaybeTrackContext();
  const p = (_a = participant != null ? participant : context) != null ? _a : trackContext == null ? void 0 : trackContext.participant;
  if (!p) {
    throw new Error(
      "No participant provided, make sure you are inside a participant context or pass the participant explicitly"
    );
  }
  return p;
}

// src/context/room-context.ts
import * as React4 from "react";
var RoomContext = React4.createContext(void 0);
function useRoomContext() {
  const ctx = React4.useContext(RoomContext);
  if (!ctx) {
    throw Error("tried to access room context outside of livekit room component");
  }
  return ctx;
}
function useMaybeRoomContext() {
  return React4.useContext(RoomContext);
}
function useEnsureRoom(room) {
  const context = useMaybeRoomContext();
  const r = room != null ? room : context;
  if (!r) {
    throw new Error(
      "No room provided, make sure you are inside a Room context or pass the room explicitly"
    );
  }
  return r;
}

// src/hooks/internal/useObservableState.ts
import * as React5 from "react";
function useObservableState(observable, startWith) {
  const [state, setState] = React5.useState(startWith);
  React5.useEffect(() => {
    if (typeof window === "undefined" || !observable)
      return;
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable]);
  return state;
}

// src/utils.ts
import * as React6 from "react";

// src/mergeProps.ts
import clsx from "clsx";
function chain(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function mergeProps(...args) {
  const result = __spreadValues({}, args[0]);
  for (let i = 1; i < args.length; i++) {
    const props = args[i];
    for (const key in props) {
      const a = result[key];
      const b = props[key];
      if (typeof a === "function" && typeof b === "function" && // This is a lot faster than a regex.
      key[0] === "o" && key[1] === "n" && key.charCodeAt(2) >= /* 'A' */
      65 && key.charCodeAt(2) <= /* 'Z' */
      90) {
        result[key] = chain(a, b);
      } else if ((key === "className" || key === "UNSAFE_className") && typeof a === "string" && typeof b === "string") {
        result[key] = clsx(a, b);
      } else {
        result[key] = b !== void 0 ? b : a;
      }
    }
  }
  return result;
}

// src/utils.ts
function isProp(prop) {
  return prop !== void 0;
}
function mergeProps2(...props) {
  return mergeProps(...props.filter(isProp));
}
function cloneSingleChild(children, props, key) {
  return React6.Children.map(children, (child) => {
    if (React6.isValidElement(child) && React6.Children.only(children)) {
      return React6.cloneElement(child, __spreadProps(__spreadValues({}, props), { key }));
    }
    return child;
  });
}

// src/components/ChatEntry.tsx
import { tokenize, createDefaultGrammar } from "@livekit/components-core";
import * as React7 from "react";
function ChatEntry(_a) {
  var _b = _a, {
    entry,
    hideName = false,
    hideTimestamp = false,
    messageFormatter
  } = _b, props = __objRest(_b, [
    "entry",
    "hideName",
    "hideTimestamp",
    "messageFormatter"
  ]);
  var _a2, _b2, _c, _d;
  const formattedMessage = React7.useMemo(() => {
    return messageFormatter ? messageFormatter(entry.message) : entry.message;
  }, [entry.message, messageFormatter]);
  const time = new Date(entry.timestamp);
  const locale = navigator ? navigator.language : "en-US";
  return /* @__PURE__ */ React7.createElement(
    "li",
    __spreadValues({
      className: "lk-chat-entry",
      title: time.toLocaleTimeString(locale, { timeStyle: "full" }),
      "data-lk-message-origin": ((_a2 = entry.from) == null ? void 0 : _a2.isLocal) ? "local" : "remote"
    }, props),
    (!hideTimestamp || !hideName) && /* @__PURE__ */ React7.createElement("span", { className: "lk-meta-data" }, !hideName && /* @__PURE__ */ React7.createElement("strong", { className: "lk-participant-name" }, (_d = (_b2 = entry.from) == null ? void 0 : _b2.name) != null ? _d : (_c = entry.from) == null ? void 0 : _c.identity), !hideTimestamp && /* @__PURE__ */ React7.createElement("span", { className: "lk-timestamp" }, time.toLocaleTimeString(locale, { timeStyle: "short" }))),
    /* @__PURE__ */ React7.createElement("span", { className: "lk-message-body" }, formattedMessage)
  );
}
function formatChatMessageLinks(message) {
  return tokenize(message, createDefaultGrammar()).map((tok, i) => {
    if (typeof tok === `string`) {
      return tok;
    } else {
      const content = tok.content.toString();
      const href = tok.type === `url` ? /^http(s?):\/\//.test(content) ? content : `https://${content}` : `mailto:${content}`;
      return /* @__PURE__ */ React7.createElement("a", { className: "lk-chat-link", key: i, href, target: "_blank", rel: "noreferrer" }, content);
    }
  });
}

// src/prefabs/Chat.tsx
function useChat() {
  const room = useRoomContext();
  const [setup, setSetup] = React8.useState();
  const isSending = useObservableState(setup == null ? void 0 : setup.isSendingObservable, false);
  const chatMessages = useObservableState(setup == null ? void 0 : setup.messageObservable, []);
  React8.useEffect(() => {
    const setupChatReturn = setupChat(room);
    setSetup(setupChatReturn);
    return setupChatReturn.destroy;
  }, [room]);
  return { send: setup == null ? void 0 : setup.send, chatMessages, isSending };
}
function Chat(_a) {
  var _b = _a, { messageFormatter } = _b, props = __objRest(_b, ["messageFormatter"]);
  const inputRef = React8.useRef(null);
  const ulRef = React8.useRef(null);
  const { send, chatMessages, isSending } = useChat();
  function handleSubmit(event) {
    return __async(this, null, function* () {
      event.preventDefault();
      if (inputRef.current && inputRef.current.value.trim() !== "") {
        if (send) {
          yield send(inputRef.current.value);
          inputRef.current.value = "";
          inputRef.current.focus();
        }
      }
    });
  }
  React8.useEffect(() => {
    var _a2;
    if (ulRef) {
      (_a2 = ulRef.current) == null ? void 0 : _a2.scrollTo({ top: ulRef.current.scrollHeight });
    }
  }, [ulRef, chatMessages]);
  return /* @__PURE__ */ React8.createElement("div", __spreadProps(__spreadValues({}, props), { className: "lk-chat" }), /* @__PURE__ */ React8.createElement("ul", { className: "lk-list lk-chat-messages", ref: ulRef }, props.children ? chatMessages.map(
    (msg, idx) => cloneSingleChild(props.children, {
      entry: msg,
      key: idx,
      messageFormatter
    })
  ) : chatMessages.map((msg, idx, allMsg) => {
    const hideName = idx >= 1 && allMsg[idx - 1].from === msg.from;
    const hideTimestamp = idx >= 1 && msg.timestamp - allMsg[idx - 1].timestamp < 6e4;
    return /* @__PURE__ */ React8.createElement(
      ChatEntry,
      {
        key: idx,
        hideName,
        hideTimestamp: hideName === false ? false : hideTimestamp,
        entry: msg,
        messageFormatter
      }
    );
  })), /* @__PURE__ */ React8.createElement("form", { className: "lk-chat-form", onSubmit: handleSubmit }, /* @__PURE__ */ React8.createElement(
    "input",
    {
      className: "lk-form-control lk-chat-form-input",
      disabled: isSending,
      ref: inputRef,
      type: "text",
      placeholder: "Enter a message..."
    }
  ), /* @__PURE__ */ React8.createElement("button", { type: "submit", className: "lk-button lk-chat-form-button", disabled: isSending }, "Send")));
}

// src/prefabs/PreJoin.tsx
import {
  createLocalAudioTrack,
  createLocalTracks,
  createLocalVideoTrack,
  facingModeFromLocalTrack,
  Track as Track2,
  VideoPresets
} from "livekit-client";
import * as React30 from "react";

// src/prefabs/MediaDeviceMenu.tsx
import { computeMenuPosition, wasClickOutside } from "@livekit/components-core";
import * as React10 from "react";

// src/components/controls/MediaDeviceSelect.tsx
import * as React9 from "react";
import { setupDeviceSelector, createMediaDeviceObserver, log } from "@livekit/components-core";
function useMediaDevices({ kind }) {
  const deviceObserver = React9.useMemo(() => createMediaDeviceObserver(kind), [kind]);
  const devices = useObservableState(deviceObserver, []);
  return devices;
}
function useMediaDeviceSelect({
  kind,
  room,
  track,
  requestPermissions
}) {
  const roomContext = useMaybeRoomContext();
  const deviceObserver = React9.useMemo(
    () => createMediaDeviceObserver(kind, requestPermissions),
    [kind, requestPermissions]
  );
  const devices = useObservableState(deviceObserver, []);
  const [currentDeviceId, setCurrentDeviceId] = React9.useState("");
  const { className, activeDeviceObservable, setActiveMediaDevice } = React9.useMemo(
    () => setupDeviceSelector(kind, room != null ? room : roomContext, track),
    [kind, room, roomContext, track]
  );
  React9.useEffect(() => {
    const listener = activeDeviceObservable.subscribe((deviceId) => {
      log.info("setCurrentDeviceId", deviceId);
      if (deviceId)
        setCurrentDeviceId(deviceId);
    });
    return () => {
      listener == null ? void 0 : listener.unsubscribe();
    };
  }, [activeDeviceObservable]);
  return { devices, className, activeDeviceId: currentDeviceId, setActiveMediaDevice };
}
function MediaDeviceSelect(_a) {
  var _b = _a, {
    kind,
    initialSelection,
    onActiveDeviceChange,
    onDeviceListChange,
    onDeviceSelectError,
    exactMatch,
    track,
    requestPermissions
  } = _b, props = __objRest(_b, [
    "kind",
    "initialSelection",
    "onActiveDeviceChange",
    "onDeviceListChange",
    "onDeviceSelectError",
    "exactMatch",
    "track",
    "requestPermissions"
  ]);
  const room = useMaybeRoomContext();
  const { devices, activeDeviceId, setActiveMediaDevice, className } = useMediaDeviceSelect({
    kind,
    room,
    track,
    requestPermissions
  });
  React9.useEffect(() => {
    if (initialSelection !== void 0) {
      setActiveMediaDevice(initialSelection);
    }
  }, [setActiveMediaDevice]);
  React9.useEffect(() => {
    if (typeof onDeviceListChange === "function") {
      onDeviceListChange(devices);
    }
  }, [onDeviceListChange, devices]);
  React9.useEffect(() => {
    if (activeDeviceId && activeDeviceId !== "") {
      onActiveDeviceChange == null ? void 0 : onActiveDeviceChange(activeDeviceId);
    }
  }, [activeDeviceId]);
  const handleActiveDeviceChange = (deviceId) => __async(this, null, function* () {
    try {
      yield setActiveMediaDevice(deviceId, { exact: exactMatch });
    } catch (e) {
      if (e instanceof Error) {
        onDeviceSelectError == null ? void 0 : onDeviceSelectError(e);
      } else {
        throw e;
      }
    }
  });
  const mergedProps = React9.useMemo(
    () => mergeProps2(props, { className }, { className: "lk-list" }),
    [className, props]
  );
  function isActive(deviceId, activeDeviceId2, index) {
    return deviceId === activeDeviceId2 || index === 0 && activeDeviceId2 === "default";
  }
  return /* @__PURE__ */ React9.createElement("ul", __spreadValues({}, mergedProps), devices.map((device, index) => /* @__PURE__ */ React9.createElement(
    "li",
    {
      key: device.deviceId,
      id: device.deviceId,
      "data-lk-active": isActive(device.deviceId, activeDeviceId, index),
      "aria-selected": isActive(device.deviceId, activeDeviceId, index),
      role: "option"
    },
    /* @__PURE__ */ React9.createElement("button", { className: "lk-button", onClick: () => handleActiveDeviceChange(device.deviceId) }, device.label)
  )));
}

// src/prefabs/MediaDeviceMenu.tsx
import { log as log2 } from "@livekit/components-core";
var MediaDeviceMenu = (_a) => {
  var _b = _a, {
    kind,
    initialSelection,
    onActiveDeviceChange,
    tracks,
    requestPermissions = false
  } = _b, props = __objRest(_b, [
    "kind",
    "initialSelection",
    "onActiveDeviceChange",
    "tracks",
    "requestPermissions"
  ]);
  const [isOpen, setIsOpen] = React10.useState(false);
  const [devices, setDevices] = React10.useState([]);
  const [updateRequired, setUpdateRequired] = React10.useState(true);
  const handleActiveDeviceChange = (kind2, deviceId) => {
    log2.debug("handle device change");
    setIsOpen(false);
    onActiveDeviceChange == null ? void 0 : onActiveDeviceChange(kind2, deviceId);
  };
  const button = React10.useRef(null);
  const tooltip = React10.useRef(null);
  React10.useLayoutEffect(() => {
    if (button.current && tooltip.current && (devices || updateRequired)) {
      computeMenuPosition(button.current, tooltip.current).then(({ x, y }) => {
        if (tooltip.current) {
          Object.assign(tooltip.current.style, { left: `${x}px`, top: `${y}px` });
        }
      });
    }
    setUpdateRequired(false);
  }, [button, tooltip, devices, updateRequired]);
  const handleClickOutside = React10.useCallback(
    (event) => {
      if (!tooltip.current) {
        return;
      }
      if (event.target === button.current) {
        return;
      }
      if (isOpen && wasClickOutside(tooltip.current, event)) {
        setIsOpen(false);
      }
    },
    [isOpen, tooltip, button]
  );
  React10.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("resize", () => setUpdateRequired(true));
    return () => {
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("resize", () => setUpdateRequired(true));
    };
  }, [handleClickOutside, setUpdateRequired]);
  return /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement(
    "button",
    __spreadProps(__spreadValues({
      className: "lk-button lk-button-menu",
      "aria-pressed": isOpen
    }, props), {
      onClick: () => setIsOpen(!isOpen),
      ref: button
    }),
    props.children
  ), !props.disabled && /* @__PURE__ */ React10.createElement(
    "div",
    {
      className: "lk-device-menu",
      ref: tooltip,
      style: { visibility: isOpen ? "visible" : "hidden" }
    },
    kind ? /* @__PURE__ */ React10.createElement(
      MediaDeviceSelect,
      {
        initialSelection,
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange(kind, deviceId),
        onDeviceListChange: setDevices,
        kind,
        track: tracks == null ? void 0 : tracks[kind],
        requestPermissions
      }
    ) : /* @__PURE__ */ React10.createElement(React10.Fragment, null, /* @__PURE__ */ React10.createElement("div", { className: "lk-device-menu-heading" }, "Audio inputs"), /* @__PURE__ */ React10.createElement(
      MediaDeviceSelect,
      {
        kind: "audioinput",
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange("audioinput", deviceId),
        onDeviceListChange: setDevices,
        track: tracks == null ? void 0 : tracks.audioinput,
        requestPermissions
      }
    ), /* @__PURE__ */ React10.createElement("div", { className: "lk-device-menu-heading" }, "Video inputs"), /* @__PURE__ */ React10.createElement(
      MediaDeviceSelect,
      {
        kind: "videoinput",
        onActiveDeviceChange: (deviceId) => handleActiveDeviceChange("videoinput", deviceId),
        onDeviceListChange: setDevices,
        track: tracks == null ? void 0 : tracks.videoinput,
        requestPermissions
      }
    ))
  ));
};

// src/components/controls/TrackToggle.tsx
import { log as log3, setupManualToggle, setupMediaToggle } from "@livekit/components-core";
import * as React28 from "react";

// src/assets/icons/util.tsx
import * as React27 from "react";
import { ConnectionQuality, Track } from "livekit-client";

// src/assets/icons/CameraDisabledIcon.tsx
import * as React11 from "react";
var SvgCameraDisabledIcon = (props) => /* @__PURE__ */ React11.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React11.createElement("path", { d: "M1.354.646a.5.5 0 1 0-.708.708l14 14a.5.5 0 0 0 .708-.708L11 10.293V4.5A1.5 1.5 0 0 0 9.5 3H3.707zM0 4.5a1.5 1.5 0 0 1 .943-1.393l9.532 9.533c-.262.224-.603.36-.975.36h-8A1.5 1.5 0 0 1 0 11.5z" }), /* @__PURE__ */ React11.createElement("path", { d: "m15.2 3.6-2.8 2.1a1 1 0 0 0-.4.8v3a1 1 0 0 0 .4.8l2.8 2.1a.5.5 0 0 0 .8-.4V4a.5.5 0 0 0-.8-.4z" }));
var CameraDisabledIcon_default = SvgCameraDisabledIcon;

// src/assets/icons/CameraIcon.tsx
import * as React12 from "react";
var SvgCameraIcon = (props) => /* @__PURE__ */ React12.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React12.createElement("path", { d: "M0 4.5A1.5 1.5 0 0 1 1.5 3h8A1.5 1.5 0 0 1 11 4.5v7A1.5 1.5 0 0 1 9.5 13h-8A1.5 1.5 0 0 1 0 11.5zM15.2 3.6l-2.8 2.1a1 1 0 0 0-.4.8v3a1 1 0 0 0 .4.8l2.8 2.1a.5.5 0 0 0 .8-.4V4a.5.5 0 0 0-.8-.4z" }));
var CameraIcon_default = SvgCameraIcon;

// src/assets/icons/ChatIcon.tsx
import * as React13 from "react";
var SvgChatIcon = (props) => /* @__PURE__ */ React13.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 18, fill: "none" }, props), /* @__PURE__ */ React13.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h10.5A2.75 2.75 0 0 1 16 2.75v13.594a.75.75 0 0 1-1.234.572l-3.691-3.12a1.25 1.25 0 0 0-.807-.296H2.75A2.75 2.75 0 0 1 0 10.75v-8ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v8c0 .69.56 1.25 1.25 1.25h7.518c.65 0 1.279.23 1.775.65l2.457 2.077V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React13.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M3 4.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Z",
    clipRule: "evenodd"
  }
));
var ChatIcon_default = SvgChatIcon;

// src/assets/icons/Chevron.tsx
import * as React14 from "react";
var SvgChevron = (props) => /* @__PURE__ */ React14.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React14.createElement(
  "path",
  {
    fill: "currentcolor",
    fillRule: "evenodd",
    d: "M5.293 2.293a1 1 0 0 1 1.414 0l4.823 4.823a1.25 1.25 0 0 1 0 1.768l-4.823 4.823a1 1 0 0 1-1.414-1.414L9.586 8 5.293 3.707a1 1 0 0 1 0-1.414z",
    clipRule: "evenodd"
  }
));
var Chevron_default = SvgChevron;

// src/assets/icons/FocusToggleIcon.tsx
import * as React15 from "react";
var SvgFocusToggleIcon = (props) => /* @__PURE__ */ React15.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React15.createElement("g", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React15.createElement("path", { d: "M10 1.75h4.25m0 0V6m0-4.25L9 7M6 14.25H1.75m0 0V10m0 4.25L7 9" })));
var FocusToggleIcon_default = SvgFocusToggleIcon;

// src/assets/icons/LeaveIcon.tsx
import * as React16 from "react";
var SvgLeaveIcon = (props) => /* @__PURE__ */ React16.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React16.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M2 2.75A2.75 2.75 0 0 1 4.75 0h6.5A2.75 2.75 0 0 1 14 2.75v10.5A2.75 2.75 0 0 1 11.25 16h-6.5A2.75 2.75 0 0 1 2 13.25v-.5a.75.75 0 0 1 1.5 0v.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25h-6.5c-.69 0-1.25.56-1.25 1.25v.5a.75.75 0 0 1-1.5 0v-.5Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React16.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8.78 7.47a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H1.75a.75.75 0 0 1 0-1.5h4.69l-.97-.97a.75.75 0 0 1 1.06-1.06l2.25 2.25Z",
    clipRule: "evenodd"
  }
));
var LeaveIcon_default = SvgLeaveIcon;

// src/assets/icons/MicDisabledIcon.tsx
import * as React17 from "react";
var SvgMicDisabledIcon = (props) => /* @__PURE__ */ React17.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React17.createElement("path", { d: "M12.227 11.52a5.477 5.477 0 0 0 1.246-2.97.5.5 0 0 0-.995-.1 4.478 4.478 0 0 1-.962 2.359l-1.07-1.07C10.794 9.247 11 8.647 11 8V3a3 3 0 0 0-6 0v1.293L1.354.646a.5.5 0 1 0-.708.708l14 14a.5.5 0 0 0 .708-.708zM8 12.5c.683 0 1.33-.152 1.911-.425l.743.743c-.649.359-1.378.59-2.154.66V15h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-1.522a5.502 5.502 0 0 1-4.973-4.929.5.5 0 0 1 .995-.098A4.5 4.5 0 0 0 8 12.5z" }), /* @__PURE__ */ React17.createElement("path", { d: "M8.743 10.907 5 7.164V8a3 3 0 0 0 3.743 2.907z" }));
var MicDisabledIcon_default = SvgMicDisabledIcon;

// src/assets/icons/MicIcon.tsx
import * as React18 from "react";
var SvgMicIcon = (props) => /* @__PURE__ */ React18.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React18.createElement(
  "path",
  {
    fillRule: "evenodd",
    d: "M2.975 8.002a.5.5 0 0 1 .547.449 4.5 4.5 0 0 0 8.956 0 .5.5 0 1 1 .995.098A5.502 5.502 0 0 1 8.5 13.478V15h2a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h2v-1.522a5.502 5.502 0 0 1-4.973-4.929.5.5 0 0 1 .448-.547z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React18.createElement("path", { d: "M5 3a3 3 0 1 1 6 0v5a3 3 0 0 1-6 0z" }));
var MicIcon_default = SvgMicIcon;

// src/assets/icons/QualityExcellentIcon.tsx
import * as React19 from "react";
var SvgQualityExcellentIcon = (props) => /* @__PURE__ */ React19.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React19.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React19.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }));
var QualityExcellentIcon_default = SvgQualityExcellentIcon;

// src/assets/icons/QualityGoodIcon.tsx
import * as React20 from "react";
var SvgQualityGoodIcon = (props) => /* @__PURE__ */ React20.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React20.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React20.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React20.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React20.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React20.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })));
var QualityGoodIcon_default = SvgQualityGoodIcon;

// src/assets/icons/QualityPoorIcon.tsx
import * as React21 from "react";
var SvgQualityPoorIcon = (props) => /* @__PURE__ */ React21.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentcolor" }, props), /* @__PURE__ */ React21.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React21.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React21.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React21.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React21.createElement("path", { d: "M6 6.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" }), /* @__PURE__ */ React21.createElement("path", { d: "M12 .5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5z" })));
var QualityPoorIcon_default = SvgQualityPoorIcon;

// src/assets/icons/QualityUnknownIcon.tsx
import * as React22 from "react";
var SvgQualityUnknownIcon = (props) => /* @__PURE__ */ React22.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "currentColor" }, props), /* @__PURE__ */ React22.createElement("g", { opacity: 0.25 }, /* @__PURE__ */ React22.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4Zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5Z" }), /* @__PURE__ */ React22.createElement("path", { d: "M0 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4Zm6-5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-9Zm6-6a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V.5Z" })));
var QualityUnknownIcon_default = SvgQualityUnknownIcon;

// src/assets/icons/ScreenShareIcon.tsx
import * as React23 from "react";
var SvgScreenShareIcon = (props) => /* @__PURE__ */ React23.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 16, fill: "none" }, props), /* @__PURE__ */ React23.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M0 2.75A2.75 2.75 0 0 1 2.75 0h14.5A2.75 2.75 0 0 1 20 2.75v10.5A2.75 2.75 0 0 1 17.25 16H2.75A2.75 2.75 0 0 1 0 13.25V2.75ZM2.75 1.5c-.69 0-1.25.56-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h14.5c.69 0 1.25-.56 1.25-1.25V2.75c0-.69-.56-1.25-1.25-1.25H2.75Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React23.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M9.47 4.22a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1-1.06 1.06l-.97-.97v4.69a.75.75 0 0 1-1.5 0V6.56l-.97.97a.75.75 0 0 1-1.06-1.06l2.25-2.25Z",
    clipRule: "evenodd"
  }
));
var ScreenShareIcon_default = SvgScreenShareIcon;

// src/assets/icons/ScreenShareStopIcon.tsx
import * as React24 from "react";
var SvgScreenShareStopIcon = (props) => /* @__PURE__ */ React24.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 20, height: 16, fill: "none" }, props), /* @__PURE__ */ React24.createElement("g", { fill: "currentColor" }, /* @__PURE__ */ React24.createElement("path", { d: "M7.28 4.22a.75.75 0 0 0-1.06 1.06L8.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L10 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L11.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L10 6.94z" }), /* @__PURE__ */ React24.createElement(
  "path",
  {
    fillRule: "evenodd",
    d: "M2.75 0A2.75 2.75 0 0 0 0 2.75v10.5A2.75 2.75 0 0 0 2.75 16h14.5A2.75 2.75 0 0 0 20 13.25V2.75A2.75 2.75 0 0 0 17.25 0zM1.5 2.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v10.5c0 .69-.56 1.25-1.25 1.25H2.75c-.69 0-1.25-.56-1.25-1.25z",
    clipRule: "evenodd"
  }
)));
var ScreenShareStopIcon_default = SvgScreenShareStopIcon;

// src/assets/icons/SpinnerIcon.tsx
import * as React25 from "react";
var SvgSpinnerIcon = (props) => /* @__PURE__ */ React25.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8 0a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V.75A.75.75 0 0 1 8 0Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M8 12a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 8 12Z",
    clipRule: "evenodd",
    opacity: 0.7
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M12 1.072a.75.75 0 0 1 .274 1.024l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 12 1.072Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M6 11.464a.75.75 0 0 1 .274 1.025l-1.25 2.165a.75.75 0 0 1-1.299-.75l1.25-2.165A.75.75 0 0 1 6 11.464Z",
    clipRule: "evenodd",
    opacity: 0.6
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M14.928 4a.75.75 0 0 1-.274 1.025l-2.165 1.25a.75.75 0 1 1-.75-1.3l2.165-1.25A.75.75 0 0 1 14.928 4Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.536 10a.75.75 0 0 1-.275 1.024l-2.165 1.25a.75.75 0 0 1-.75-1.298l2.165-1.25A.75.75 0 0 1 4.536 10Z",
    clipRule: "evenodd",
    opacity: 0.5
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M16 8a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 16 8Z",
    clipRule: "evenodd"
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4 8a.75.75 0 0 1-.75.75H.75a.75.75 0 0 1 0-1.5h2.5A.75.75 0 0 1 4 8Z",
    clipRule: "evenodd",
    opacity: 0.4
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M14.928 12a.75.75 0 0 1-1.024.274l-2.165-1.25a.75.75 0 0 1 .75-1.299l2.165 1.25A.75.75 0 0 1 14.928 12Z",
    clipRule: "evenodd",
    opacity: 0.9
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M4.536 6a.75.75 0 0 1-1.025.275l-2.165-1.25a.75.75 0 1 1 .75-1.3l2.165 1.25A.75.75 0 0 1 4.536 6Z",
    clipRule: "evenodd",
    opacity: 0.3
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M12 14.928a.75.75 0 0 1-1.024-.274l-1.25-2.165a.75.75 0 0 1 1.298-.75l1.25 2.165A.75.75 0 0 1 12 14.928Z",
    clipRule: "evenodd",
    opacity: 0.8
  }
), /* @__PURE__ */ React25.createElement(
  "path",
  {
    fill: "currentColor",
    fillRule: "evenodd",
    d: "M6 4.536a.75.75 0 0 1-1.024-.275l-1.25-2.165a.75.75 0 1 1 1.299-.75l1.25 2.165A.75.75 0 0 1 6 4.536Z",
    clipRule: "evenodd",
    opacity: 0.2
  }
));
var SpinnerIcon_default = SvgSpinnerIcon;

// src/assets/icons/UnfocusToggleIcon.tsx
import * as React26 from "react";
var SvgUnfocusToggleIcon = (props) => /* @__PURE__ */ React26.createElement("svg", __spreadValues({ xmlns: "http://www.w3.org/2000/svg", width: 16, height: 16, fill: "none" }, props), /* @__PURE__ */ React26.createElement("g", { stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5 }, /* @__PURE__ */ React26.createElement("path", { d: "M13.25 7H9m0 0V2.75M9 7l5.25-5.25M2.75 9H7m0 0v4.25M7 9l-5.25 5.25" })));
var UnfocusToggleIcon_default = SvgUnfocusToggleIcon;

// src/assets/icons/util.tsx
function getSourceIcon(source, enabled) {
  switch (source) {
    case Track.Source.Microphone:
      return enabled ? /* @__PURE__ */ React27.createElement(MicIcon_default, null) : /* @__PURE__ */ React27.createElement(MicDisabledIcon_default, null);
    case Track.Source.Camera:
      return enabled ? /* @__PURE__ */ React27.createElement(CameraIcon_default, null) : /* @__PURE__ */ React27.createElement(CameraDisabledIcon_default, null);
    case Track.Source.ScreenShare:
      return enabled ? /* @__PURE__ */ React27.createElement(ScreenShareStopIcon_default, null) : /* @__PURE__ */ React27.createElement(ScreenShareIcon_default, null);
    default:
      return void 0;
  }
}
function getConnectionQualityIcon(quality) {
  switch (quality) {
    case ConnectionQuality.Excellent:
      return /* @__PURE__ */ React27.createElement(QualityExcellentIcon_default, null);
    case ConnectionQuality.Good:
      return /* @__PURE__ */ React27.createElement(QualityGoodIcon_default, null);
    case ConnectionQuality.Poor:
      return /* @__PURE__ */ React27.createElement(QualityPoorIcon_default, null);
    default:
      return /* @__PURE__ */ React27.createElement(QualityUnknownIcon_default, null);
  }
}

// src/components/controls/TrackToggle.tsx
function useTrackToggle(_a) {
  var _b = _a, {
    source,
    onChange,
    initialState,
    captureOptions
  } = _b, rest = __objRest(_b, [
    "source",
    "onChange",
    "initialState",
    "captureOptions"
  ]);
  var _a2;
  const room = useMaybeRoomContext();
  const track = (_a2 = room == null ? void 0 : room.localParticipant) == null ? void 0 : _a2.getTrack(source);
  const { toggle, className, pendingObserver, enabledObserver } = React28.useMemo(
    () => room ? setupMediaToggle(source, room, captureOptions) : setupManualToggle(),
    [room, source, JSON.stringify(captureOptions)]
  );
  const pending = useObservableState(pendingObserver, false);
  const enabled = useObservableState(enabledObserver, initialState != null ? initialState : !!(track == null ? void 0 : track.isEnabled));
  React28.useEffect(() => {
    onChange == null ? void 0 : onChange(enabled);
  }, [enabled, onChange]);
  React28.useEffect(() => {
    if (initialState !== void 0) {
      log3.debug("forcing initial toggle state", source, initialState);
      toggle(initialState);
    }
  }, []);
  const newProps = React28.useMemo(() => mergeProps(rest, { className }), [rest, className]);
  const clickHandler = React28.useCallback(
    (evt) => {
      var _a3;
      toggle();
      (_a3 = rest.onClick) == null ? void 0 : _a3.call(rest, evt);
    },
    [rest, toggle]
  );
  return {
    toggle,
    enabled,
    pending,
    track,
    buttonProps: __spreadProps(__spreadValues({}, newProps), {
      "aria-pressed": enabled,
      "data-lk-source": source,
      "data-lk-enabled": enabled,
      disabled: pending,
      onClick: clickHandler
    })
  };
}
function TrackToggle(_a) {
  var _b = _a, { showIcon } = _b, props = __objRest(_b, ["showIcon"]);
  const { buttonProps, enabled } = useTrackToggle(props);
  return /* @__PURE__ */ React28.createElement("button", __spreadValues({}, buttonProps), (showIcon != null ? showIcon : true) && getSourceIcon(props.source, enabled), props.children);
}

// src/prefabs/PreJoin.tsx
import { log as log4 } from "@livekit/components-core";

// src/assets/images/ParticipantPlaceholder.tsx
import * as React29 from "react";
var SvgParticipantPlaceholder = (props) => /* @__PURE__ */ React29.createElement(
  "svg",
  __spreadValues({
    width: 320,
    height: 320,
    viewBox: "0 0 320 320",
    preserveAspectRatio: "xMidYMid meet",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props),
  /* @__PURE__ */ React29.createElement(
    "path",
    {
      d: "M160 180C204.182 180 240 144.183 240 100C240 55.8172 204.182 20 160 20C115.817 20 79.9997 55.8172 79.9997 100C79.9997 144.183 115.817 180 160 180Z",
      fill: "white",
      fillOpacity: 0.25
    }
  ),
  /* @__PURE__ */ React29.createElement(
    "path",
    {
      d: "M97.6542 194.614C103.267 191.818 109.841 192.481 115.519 195.141C129.025 201.466 144.1 205 159.999 205C175.899 205 190.973 201.466 204.48 195.141C210.158 192.481 216.732 191.818 222.345 194.614C262.703 214.719 291.985 253.736 298.591 300.062C300.15 310.997 291.045 320 280 320H39.9997C28.954 320 19.8495 310.997 21.4087 300.062C28.014 253.736 57.2966 214.72 97.6542 194.614Z",
      fill: "white",
      fillOpacity: 0.25
    }
  )
);
var ParticipantPlaceholder_default = SvgParticipantPlaceholder;

// src/prefabs/PreJoin.tsx
var DEFAULT_USER_CHOICES = {
  username: "",
  videoEnabled: true,
  audioEnabled: true,
  videoDeviceId: "default",
  audioDeviceId: "default"
};
function usePreviewTracks(options, onError) {
  const [tracks, setTracks] = React30.useState();
  React30.useEffect(() => {
    let trackPromise = void 0;
    let needsCleanup = false;
    if (options.audio || options.video) {
      trackPromise = createLocalTracks(options);
      trackPromise.then((tracks2) => {
        if (needsCleanup) {
          tracks2.forEach((tr) => tr.stop());
        } else {
          setTracks(tracks2);
        }
      }).catch(onError);
    }
    return () => {
      needsCleanup = true;
      trackPromise == null ? void 0 : trackPromise.then(
        (tracks2) => tracks2.forEach((track) => {
          track.stop();
        })
      );
    };
  }, [JSON.stringify(options)]);
  return tracks;
}
function usePreviewDevice(enabled, deviceId, kind) {
  const [deviceError, setDeviceError] = React30.useState(null);
  const [isCreatingTrack, setIsCreatingTrack] = React30.useState(false);
  const devices = useMediaDevices({ kind });
  const [selectedDevice, setSelectedDevice] = React30.useState(
    void 0
  );
  const [localTrack, setLocalTrack] = React30.useState();
  const [localDeviceId, setLocalDeviceId] = React30.useState(deviceId);
  React30.useEffect(() => {
    setLocalDeviceId(deviceId);
  }, [deviceId]);
  const createTrack = (deviceId2, kind2) => __async(this, null, function* () {
    try {
      const track = kind2 === "videoinput" ? yield createLocalVideoTrack({
        deviceId: deviceId2,
        resolution: VideoPresets.h720.resolution
      }) : yield createLocalAudioTrack({ deviceId: deviceId2 });
      const newDeviceId = yield track.getDeviceId();
      if (newDeviceId && deviceId2 !== newDeviceId) {
        prevDeviceId.current = newDeviceId;
        setLocalDeviceId(newDeviceId);
      }
      setLocalTrack(track);
    } catch (e) {
      if (e instanceof Error) {
        setDeviceError(e);
      }
    }
  });
  const switchDevice = (track, id) => __async(this, null, function* () {
    yield track.setDeviceId(id);
    prevDeviceId.current = id;
  });
  const prevDeviceId = React30.useRef(localDeviceId);
  React30.useEffect(() => {
    if (enabled && !localTrack && !deviceError && !isCreatingTrack) {
      log4.debug("creating track", kind);
      setIsCreatingTrack(true);
      createTrack(localDeviceId, kind).finally(() => {
        setIsCreatingTrack(false);
      });
    }
  }, [enabled, localTrack, deviceError, isCreatingTrack]);
  React30.useEffect(() => {
    if (!localTrack) {
      return;
    }
    if (!enabled) {
      log4.debug(`muting ${kind} track`);
      localTrack.mute().then(() => log4.debug(localTrack.mediaStreamTrack));
    } else if ((selectedDevice == null ? void 0 : selectedDevice.deviceId) && prevDeviceId.current !== (selectedDevice == null ? void 0 : selectedDevice.deviceId)) {
      log4.debug(`switching ${kind} device from`, prevDeviceId.current, selectedDevice.deviceId);
      switchDevice(localTrack, selectedDevice.deviceId);
    } else {
      log4.debug(`unmuting local ${kind} track`);
      localTrack.unmute();
    }
  }, [localTrack, selectedDevice, enabled, kind]);
  React30.useEffect(() => {
    return () => {
      if (localTrack) {
        log4.debug(`stopping local ${kind} track`);
        localTrack.stop();
        localTrack.mute();
      }
    };
  }, []);
  React30.useEffect(() => {
    setSelectedDevice(devices.find((dev) => dev.deviceId === localDeviceId));
  }, [localDeviceId, devices]);
  return {
    selectedDevice,
    localTrack,
    deviceError
  };
}
var PreJoin = (_a) => {
  var _b = _a, {
    defaults = {},
    onValidate,
    onSubmit,
    onError,
    debug,
    joinLabel = "Join Room",
    micLabel = "Microphone",
    camLabel = "Camera",
    userLabel = "Username"
  } = _b, htmlProps = __objRest(_b, [
    "defaults",
    "onValidate",
    "onSubmit",
    "onError",
    "debug",
    "joinLabel",
    "micLabel",
    "camLabel",
    "userLabel"
  ]);
  var _a2, _b2, _c, _d, _e;
  const [userChoices, setUserChoices] = React30.useState(DEFAULT_USER_CHOICES);
  const [username, setUsername] = React30.useState(
    (_a2 = defaults.username) != null ? _a2 : DEFAULT_USER_CHOICES.username
  );
  const [videoEnabled, setVideoEnabled] = React30.useState(
    (_b2 = defaults.videoEnabled) != null ? _b2 : DEFAULT_USER_CHOICES.videoEnabled
  );
  const initialVideoDeviceId = (_c = defaults.videoDeviceId) != null ? _c : DEFAULT_USER_CHOICES.videoDeviceId;
  const [videoDeviceId, setVideoDeviceId] = React30.useState(initialVideoDeviceId);
  const initialAudioDeviceId = (_d = defaults.audioDeviceId) != null ? _d : DEFAULT_USER_CHOICES.audioDeviceId;
  const [audioEnabled, setAudioEnabled] = React30.useState(
    (_e = defaults.audioEnabled) != null ? _e : DEFAULT_USER_CHOICES.audioEnabled
  );
  const [audioDeviceId, setAudioDeviceId] = React30.useState(initialAudioDeviceId);
  const tracks = usePreviewTracks(
    {
      audio: audioEnabled ? { deviceId: initialAudioDeviceId } : false,
      video: videoEnabled ? { deviceId: initialVideoDeviceId } : false
    },
    onError
  );
  const videoEl = React30.useRef(null);
  const videoTrack = React30.useMemo(
    () => tracks == null ? void 0 : tracks.filter((track) => track.kind === Track2.Kind.Video)[0],
    [tracks]
  );
  const facingMode = React30.useMemo(() => {
    if (videoTrack) {
      const { facingMode: facingMode2 } = facingModeFromLocalTrack(videoTrack);
      return facingMode2;
    } else {
      return "undefined";
    }
  }, [videoTrack]);
  const audioTrack = React30.useMemo(
    () => tracks == null ? void 0 : tracks.filter((track) => track.kind === Track2.Kind.Audio)[0],
    [tracks]
  );
  React30.useEffect(() => {
    if (videoEl.current && videoTrack) {
      videoTrack.unmute();
      videoTrack.attach(videoEl.current);
    }
    return () => {
      videoTrack == null ? void 0 : videoTrack.detach();
    };
  }, [videoTrack]);
  const [isValid, setIsValid] = React30.useState();
  const handleValidation = React30.useCallback(
    (values) => {
      if (typeof onValidate === "function") {
        return onValidate(values);
      } else {
        return values.username !== "";
      }
    },
    [onValidate]
  );
  React30.useEffect(() => {
    const newUserChoices = {
      username,
      videoEnabled,
      videoDeviceId,
      audioEnabled,
      audioDeviceId
    };
    setUserChoices(newUserChoices);
    setIsValid(handleValidation(newUserChoices));
  }, [username, videoEnabled, handleValidation, audioEnabled, audioDeviceId, videoDeviceId]);
  function handleSubmit(event) {
    event.preventDefault();
    if (handleValidation(userChoices)) {
      if (typeof onSubmit === "function") {
        onSubmit(userChoices);
      }
    } else {
      log4.warn("Validation failed with: ", userChoices);
    }
  }
  return /* @__PURE__ */ React30.createElement("div", __spreadValues({ className: "lk-prejoin" }, htmlProps), /* @__PURE__ */ React30.createElement("div", { className: "lk-video-container" }, videoTrack && /* @__PURE__ */ React30.createElement("video", { ref: videoEl, width: "1280", height: "720", "data-lk-facing-mode": facingMode }), (!videoTrack || !videoEnabled) && /* @__PURE__ */ React30.createElement("div", { className: "lk-camera-off-note" }, /* @__PURE__ */ React30.createElement(ParticipantPlaceholder_default, null))), /* @__PURE__ */ React30.createElement("div", { className: "lk-button-group-container" }, /* @__PURE__ */ React30.createElement("div", { className: "lk-button-group audio" }, /* @__PURE__ */ React30.createElement(
    TrackToggle,
    {
      initialState: audioEnabled,
      source: Track2.Source.Microphone,
      onChange: (enabled) => setAudioEnabled(enabled)
    },
    micLabel
  ), /* @__PURE__ */ React30.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React30.createElement(
    MediaDeviceMenu,
    {
      initialSelection: audioDeviceId,
      kind: "audioinput",
      disabled: !audioTrack,
      tracks: { audioinput: audioTrack },
      onActiveDeviceChange: (_, id) => setAudioDeviceId(id)
    }
  ))), /* @__PURE__ */ React30.createElement("div", { className: "lk-button-group video" }, /* @__PURE__ */ React30.createElement(
    TrackToggle,
    {
      initialState: videoEnabled,
      source: Track2.Source.Camera,
      onChange: (enabled) => setVideoEnabled(enabled)
    },
    camLabel
  ), /* @__PURE__ */ React30.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React30.createElement(
    MediaDeviceMenu,
    {
      initialSelection: videoDeviceId,
      kind: "videoinput",
      disabled: !videoTrack,
      tracks: { videoinput: videoTrack },
      onActiveDeviceChange: (_, id) => setVideoDeviceId(id)
    }
  )))), /* @__PURE__ */ React30.createElement("form", { className: "lk-username-container" }, /* @__PURE__ */ React30.createElement(
    "input",
    {
      className: "lk-form-control",
      id: "username",
      name: "username",
      type: "text",
      defaultValue: username,
      placeholder: userLabel,
      onChange: (inputEl) => setUsername(inputEl.target.value),
      autoComplete: "off"
    }
  ), /* @__PURE__ */ React30.createElement(
    "button",
    {
      className: "lk-button lk-join-button",
      type: "submit",
      onClick: handleSubmit,
      disabled: !isValid
    },
    joinLabel
  )), debug && /* @__PURE__ */ React30.createElement(React30.Fragment, null, /* @__PURE__ */ React30.createElement("strong", null, "User Choices:"), /* @__PURE__ */ React30.createElement("ul", { className: "lk-list", style: { overflow: "hidden", maxWidth: "15rem" } }, /* @__PURE__ */ React30.createElement("li", null, "Username: ", `${userChoices.username}`), /* @__PURE__ */ React30.createElement("li", null, "Video Enabled: ", `${userChoices.videoEnabled}`), /* @__PURE__ */ React30.createElement("li", null, "Audio Enabled: ", `${userChoices.audioEnabled}`), /* @__PURE__ */ React30.createElement("li", null, "Video Device: ", `${userChoices.videoDeviceId}`), /* @__PURE__ */ React30.createElement("li", null, "Audio Device: ", `${userChoices.audioDeviceId}`))));
};

// src/prefabs/VideoConference.tsx
import * as React69 from "react";

// src/components/layout/LayoutContextProvider.tsx
import { log as log5 } from "@livekit/components-core";
import * as React31 from "react";
function LayoutContextProvider({
  value,
  onPinChange,
  onWidgetChange,
  children
}) {
  const layoutContextValue = useEnsureCreateLayoutContext(value);
  React31.useEffect(() => {
    log5.debug("PinState Updated", { state: layoutContextValue.pin.state });
    if (onPinChange && layoutContextValue.pin.state)
      onPinChange(layoutContextValue.pin.state);
  }, [layoutContextValue.pin.state, onPinChange]);
  React31.useEffect(() => {
    log5.debug("Widget Updated", { widgetState: layoutContextValue.widget.state });
    if (onWidgetChange && layoutContextValue.widget.state) {
      onWidgetChange(layoutContextValue.widget.state);
    }
  }, [onWidgetChange, layoutContextValue.widget.state]);
  return /* @__PURE__ */ React31.createElement(LayoutContext.Provider, { value: layoutContextValue }, children);
}

// src/components/RoomAudioRenderer.tsx
import { isLocal as isLocal2 } from "@livekit/components-core";
import { Track as Track4 } from "livekit-client";
import * as React47 from "react";

// src/hooks/internal/useResizeObserver.ts
import * as React32 from "react";
import useLatest from "@react-hook/latest";
function useResizeObserver(target, callback) {
  const resizeObserver = getResizeObserver();
  const storedCallback = useLatest(callback);
  React32.useLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = target.current;
    if (!targetEl)
      return;
    function cb(entry, observer) {
      if (didUnsubscribe)
        return;
      storedCallback.current(entry, observer);
    }
    resizeObserver == null ? void 0 : resizeObserver.subscribe(targetEl, cb);
    return () => {
      didUnsubscribe = true;
      resizeObserver == null ? void 0 : resizeObserver.unsubscribe(targetEl, cb);
    };
  }, [target.current, resizeObserver, storedCallback]);
  return resizeObserver == null ? void 0 : resizeObserver.observer;
}
function createResizeObserver() {
  let ticking = false;
  let allEntries = [];
  const callbacks = /* @__PURE__ */ new Map();
  if (typeof window === "undefined") {
    return;
  }
  const observer = new ResizeObserver((entries, obs) => {
    allEntries = allEntries.concat(entries);
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const triggered = /* @__PURE__ */ new Set();
        for (let i = 0; i < allEntries.length; i++) {
          if (triggered.has(allEntries[i].target))
            continue;
          triggered.add(allEntries[i].target);
          const cbs = callbacks.get(allEntries[i].target);
          cbs == null ? void 0 : cbs.forEach((cb) => cb(allEntries[i], obs));
        }
        allEntries = [];
        ticking = false;
      });
    }
    ticking = true;
  });
  return {
    observer,
    subscribe(target, callback) {
      var _a;
      observer.observe(target);
      const cbs = (_a = callbacks.get(target)) != null ? _a : [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(target, callback) {
      var _a;
      const cbs = (_a = callbacks.get(target)) != null ? _a : [];
      if (cbs.length === 1) {
        observer.unobserve(target);
        callbacks.delete(target);
        return;
      }
      const cbIndex = cbs.indexOf(callback);
      if (cbIndex !== -1)
        cbs.splice(cbIndex, 1);
      callbacks.set(target, cbs);
    }
  };
}
var _resizeObserver;
var getResizeObserver = () => !_resizeObserver ? _resizeObserver = createResizeObserver() : _resizeObserver;
var useSize = (target) => {
  const [size, setSize] = React32.useState({ width: 0, height: 0 });
  React32.useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target.current]);
  const resizeCallback = React32.useCallback(
    (entry) => setSize(entry.contentRect),
    []
  );
  useResizeObserver(target, resizeCallback);
  return size;
};

// src/hooks/internal/useMediaQuery.ts
import * as React33 from "react";
function useMediaQuery(query) {
  const getMatches = (query2) => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query2).matches;
    }
    return false;
  };
  const [matches, setMatches] = React33.useState(getMatches(query));
  function handleChange() {
    setMatches(getMatches(query));
  }
  React33.useEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();
    if (matchMedia.addListener) {
      matchMedia.addListener(handleChange);
    } else {
      matchMedia.addEventListener("change", handleChange);
    }
    return () => {
      if (matchMedia.removeListener) {
        matchMedia.removeListener(handleChange);
      } else {
        matchMedia.removeEventListener("change", handleChange);
      }
    };
  }, [query]);
  return matches;
}

// src/hooks/useGridLayout.ts
import { GRID_LAYOUTS, selectGridLayout } from "@livekit/components-core";
import * as React34 from "react";
function useGridLayout(gridElement, trackCount) {
  const { width, height } = useSize(gridElement);
  const layout = width > 0 && height > 0 ? selectGridLayout(GRID_LAYOUTS, trackCount, width, height) : GRID_LAYOUTS[0];
  React34.useEffect(() => {
    if (gridElement.current && layout) {
      gridElement.current.style.setProperty("--lk-col-count", layout == null ? void 0 : layout.columns.toString());
      gridElement.current.style.setProperty("--lk-row-count", layout == null ? void 0 : layout.rows.toString());
    }
  }, [gridElement, layout]);
  return {
    layout
  };
}

// src/hooks/useIsMuted.ts
import { mutedObserver } from "@livekit/components-core";
import * as React35 from "react";
function useIsMuted(source, options = {}) {
  var _a;
  const p = useEnsureParticipant(options.participant);
  const [isMuted, setIsMuted] = React35.useState(!!((_a = p.getTrack(source)) == null ? void 0 : _a.isMuted));
  React35.useEffect(() => {
    const listener = mutedObserver(p, source).subscribe(setIsMuted);
    return () => listener.unsubscribe();
  }, [p, source]);
  return isMuted;
}

// src/hooks/useIsSpeaking.ts
import { createIsSpeakingObserver } from "@livekit/components-core";
import * as React36 from "react";
function useIsSpeaking(participant) {
  const p = useEnsureParticipant(participant);
  const observable = React36.useMemo(() => createIsSpeakingObserver(p), [p]);
  const isSpeaking = useObservableState(observable, p.isSpeaking);
  return isSpeaking;
}

// src/hooks/useLocalParticipant.ts
import { observeParticipantMedia } from "@livekit/components-core";
import * as React37 from "react";
var useLocalParticipant = (options = {}) => {
  const room = useEnsureRoom(options.room);
  const [localParticipant, setLocalParticipant] = React37.useState(room.localParticipant);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = React37.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isCameraEnabled, setIsCameraEnabled] = React37.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React37.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [microphoneTrack, setMicrophoneTrack] = React37.useState(
    void 0
  );
  const [cameraTrack, setCameraTrack] = React37.useState(void 0);
  const handleUpdate = (media) => {
    setIsCameraEnabled(media.isCameraEnabled);
    setIsMicrophoneEnabled(media.isMicrophoneEnabled);
    setIsScreenShareEnabled(media.isScreenShareEnabled);
    setCameraTrack(media.cameraTrack);
    setMicrophoneTrack(media.microphoneTrack);
    setLocalParticipant(media.participant);
  };
  React37.useEffect(() => {
    const listener = observeParticipantMedia(localParticipant).subscribe(handleUpdate);
    return () => listener.unsubscribe();
  }, [localParticipant]);
  return {
    isMicrophoneEnabled,
    isScreenShareEnabled,
    isCameraEnabled,
    microphoneTrack,
    cameraTrack,
    localParticipant
  };
};

// src/hooks/useLocalParticipantPermissions.ts
import { participantPermissionObserver } from "@livekit/components-core";
import * as React38 from "react";
function useLocalParticipantPermissions() {
  const room = useRoomContext();
  const permissionObserver = React38.useMemo(
    () => participantPermissionObserver(room.localParticipant),
    [room]
  );
  const permissions = useObservableState(permissionObserver, room.localParticipant.permissions);
  return permissions;
}

// src/hooks/useMediaTrackBySourceOrName.ts
import { isTrackReference } from "@livekit/components-core";
import { setupMediaTrack, log as log6, isLocal, getTrackByIdentifier } from "@livekit/components-core";
import * as React39 from "react";
function useMediaTrackBySourceOrName(observerOptions, options = {}) {
  const [publication, setPublication] = React39.useState(getTrackByIdentifier(observerOptions));
  const [isMuted, setMuted] = React39.useState(publication == null ? void 0 : publication.isMuted);
  const [isSubscribed, setSubscribed] = React39.useState(publication == null ? void 0 : publication.isSubscribed);
  const [track, setTrack] = React39.useState(publication == null ? void 0 : publication.track);
  const [orientation, setOrientation] = React39.useState("landscape");
  const previousElement = React39.useRef();
  const { className, trackObserver } = React39.useMemo(() => {
    return setupMediaTrack(observerOptions);
  }, [
    observerOptions.participant.identity,
    observerOptions.source,
    isTrackReference(observerOptions) && observerOptions.publication.trackSid
  ]);
  React39.useEffect(() => {
    const subscription = trackObserver.subscribe((publication2) => {
      log6.debug("update track", publication2);
      setPublication(publication2);
      setMuted(publication2 == null ? void 0 : publication2.isMuted);
      setSubscribed(publication2 == null ? void 0 : publication2.isSubscribed);
      setTrack(publication2 == null ? void 0 : publication2.track);
    });
    return () => subscription == null ? void 0 : subscription.unsubscribe();
  }, [trackObserver]);
  React39.useEffect(() => {
    var _a, _b;
    if (track) {
      if (previousElement.current) {
        track.detach(previousElement.current);
      }
      if (((_a = options.element) == null ? void 0 : _a.current) && !(isLocal(observerOptions.participant) && (track == null ? void 0 : track.kind) === "audio")) {
        track.attach(options.element.current);
      }
    }
    previousElement.current = (_b = options.element) == null ? void 0 : _b.current;
    return () => {
      if (previousElement.current) {
        track == null ? void 0 : track.detach(previousElement.current);
      }
    };
  }, [track, options.element]);
  React39.useEffect(() => {
    var _a, _b;
    if (typeof ((_a = publication == null ? void 0 : publication.dimensions) == null ? void 0 : _a.width) === "number" && typeof ((_b = publication == null ? void 0 : publication.dimensions) == null ? void 0 : _b.height) === "number") {
      const orientation_ = publication.dimensions.width > publication.dimensions.height ? "landscape" : "portrait";
      setOrientation(orientation_);
    }
  }, [publication]);
  return {
    publication,
    isMuted,
    isSubscribed,
    track,
    elementProps: mergeProps2(options.props, __spreadValues({
      className,
      "data-lk-local-participant": observerOptions.participant.isLocal,
      "data-lk-source": publication == null ? void 0 : publication.source
    }, (publication == null ? void 0 : publication.kind) === "video" && { "data-lk-orientation": orientation }))
  };
}

// src/hooks/useMediaTrack.ts
function useMediaTrack(source, participant, options = {}) {
  const p = useEnsureParticipant(participant);
  return useMediaTrackBySourceOrName({ source, participant: p }, options);
}

// src/hooks/usePagination.ts
import * as React41 from "react";

// src/hooks/useVisualStableUpdate.ts
import { log as log7, sortTrackReferences, updatePages } from "@livekit/components-core";
import * as React40 from "react";
function useVisualStableUpdate(trackReferences, maxItemsOnPage, options = {}) {
  const lastTrackRefs = React40.useRef([]);
  const lastMaxItemsOnPage = React40.useRef(-1);
  const layoutChanged = maxItemsOnPage !== lastMaxItemsOnPage.current;
  const sortedTrackRefs = typeof options.customSortFunction === "function" ? options.customSortFunction(trackReferences) : sortTrackReferences(trackReferences);
  let updatedTrackRefs = [...sortedTrackRefs];
  if (layoutChanged === false) {
    try {
      updatedTrackRefs = updatePages(lastTrackRefs.current, sortedTrackRefs, maxItemsOnPage);
    } catch (error) {
      log7.error("Error while running updatePages(): ", error);
    }
  }
  if (layoutChanged) {
    lastTrackRefs.current = sortedTrackRefs;
  } else {
    lastTrackRefs.current = updatedTrackRefs;
  }
  lastMaxItemsOnPage.current = maxItemsOnPage;
  return updatedTrackRefs;
}

// src/hooks/usePagination.ts
function usePagination(itemPerPage, trackReferences) {
  const [currentPage, setCurrentPage] = React41.useState(1);
  const totalPageCount = Math.max(Math.ceil(trackReferences.length / itemPerPage), 1);
  if (currentPage > totalPageCount) {
    setCurrentPage(totalPageCount);
  }
  const lastItemIndex = currentPage * itemPerPage;
  const firstItemIndex = lastItemIndex - itemPerPage;
  const changePage = (direction) => {
    setCurrentPage((state) => {
      if (direction === "next") {
        if (state === totalPageCount) {
          return state;
        }
        return state + 1;
      } else {
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };
  const goToPage = (num) => {
    if (num > totalPageCount) {
      setCurrentPage(totalPageCount);
    } else if (num < 1) {
      setCurrentPage(1);
    } else {
      setCurrentPage(num);
    }
  };
  const updatedTrackReferences = useVisualStableUpdate(trackReferences, itemPerPage);
  return {
    totalPageCount,
    nextPage: () => changePage("next"),
    prevPage: () => changePage("previous"),
    setPage: goToPage,
    firstItemIndex,
    lastItemIndex,
    tracks: updatedTrackReferences.slice(firstItemIndex, lastItemIndex),
    currentPage
  };
}

// src/hooks/useRemoteParticipants.ts
import { connectedParticipantsObserver } from "@livekit/components-core";
import * as React42 from "react";
var useRemoteParticipants = (options = {}) => {
  const room = useEnsureRoom(options.room);
  const [participants, setParticipants] = React42.useState([]);
  React42.useEffect(() => {
    const listener = connectedParticipantsObserver(room, {
      additionalRoomEvents: options.updateOnlyOn
    }).subscribe(setParticipants);
    return () => listener.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn)]);
  return participants;
};

// src/hooks/useParticipants.ts
var useParticipants = (options = {}) => {
  const remoteParticipants = useRemoteParticipants(options);
  const { localParticipant } = useLocalParticipant(options);
  return [localParticipant, ...remoteParticipants];
};

// src/hooks/useTracks.ts
import {
  isSourcesWithOptions,
  isSourceWitOptions,
  log as log8,
  trackReferencesObservable
} from "@livekit/components-core";
import { Track as Track3 } from "livekit-client";
import * as React43 from "react";
function useTracks(sources = [
  Track3.Source.Camera,
  Track3.Source.Microphone,
  Track3.Source.ScreenShare,
  Track3.Source.ScreenShareAudio,
  Track3.Source.Unknown
], options = {}) {
  const room = useEnsureRoom(options.room);
  const [trackReferences, setTrackReferences] = React43.useState([]);
  const [participants, setParticipants] = React43.useState([]);
  const sources_ = React43.useMemo(() => {
    return sources.map((s) => isSourceWitOptions(s) ? s.source : s);
  }, [JSON.stringify(sources)]);
  React43.useEffect(() => {
    const subscription = trackReferencesObservable(room, sources_, {
      additionalRoomEvents: options.updateOnlyOn,
      onlySubscribed: options.onlySubscribed
    }).subscribe(({ trackReferences: trackReferences2, participants: participants2 }) => {
      log8.debug("setting track bundles", trackReferences2, participants2);
      setTrackReferences(trackReferences2);
      setParticipants(participants2);
    });
    return () => subscription.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn), JSON.stringify(sources)]);
  const maybeTrackReferences = React43.useMemo(() => {
    if (isSourcesWithOptions(sources)) {
      const requirePlaceholder = requiredPlaceholders(sources, participants);
      const trackReferencesWithPlaceholders = Array.from(
        trackReferences
      );
      participants.forEach((participant) => {
        var _a;
        if (requirePlaceholder.has(participant.identity)) {
          const sourcesToAddPlaceholder = (_a = requirePlaceholder.get(participant.identity)) != null ? _a : [];
          sourcesToAddPlaceholder.forEach((placeholderSource) => {
            if (trackReferences.find(
              ({ participant: p, publication }) => participant.identity === p.identity && publication.source === placeholderSource
            )) {
              return;
            }
            log8.debug(
              `Add ${placeholderSource} placeholder for participant ${participant.identity}.`
            );
            const placeholder = {
              participant,
              source: placeholderSource
            };
            trackReferencesWithPlaceholders.push(placeholder);
          });
        }
      });
      return trackReferencesWithPlaceholders;
    } else {
      return trackReferences;
    }
  }, [trackReferences, participants, sources]);
  return maybeTrackReferences;
}
function difference(setA, setB) {
  const _difference = new Set(setA);
  for (const elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
function requiredPlaceholders(sources, participants) {
  const placeholderMap = /* @__PURE__ */ new Map();
  if (isSourcesWithOptions(sources)) {
    const sourcesThatNeedPlaceholder = sources.filter((sourceWithOption) => sourceWithOption.withPlaceholder).map((sourceWithOption) => sourceWithOption.source);
    participants.forEach((participant) => {
      const sourcesOfSubscribedTracks = participant.getTracks().map((pub) => {
        var _a;
        return (_a = pub.track) == null ? void 0 : _a.source;
      }).filter((trackSource) => trackSource !== void 0);
      const placeholderNeededForThisParticipant = Array.from(
        difference(new Set(sourcesThatNeedPlaceholder), new Set(sourcesOfSubscribedTracks))
      );
      if (placeholderNeededForThisParticipant.length > 0) {
        placeholderMap.set(participant.identity, placeholderNeededForThisParticipant);
      }
    });
  }
  return placeholderMap;
}

// src/hooks/usePinnedTracks.ts
import * as React44 from "react";
function usePinnedTracks(layoutContext) {
  layoutContext = useEnsureLayoutContext(layoutContext);
  return React44.useMemo(() => {
    if ((layoutContext == null ? void 0 : layoutContext.pin.state) !== void 0 && layoutContext.pin.state.length >= 1) {
      return layoutContext.pin.state;
    }
    return [];
  }, [layoutContext.pin.state]);
}

// src/hooks/useSwipe.ts
import * as React45 from "react";
function useSwipe(element, options = {}) {
  var _a;
  const touchStart = React45.useRef(null);
  const touchEnd = React45.useRef(null);
  const minSwipeDistance = (_a = options.minSwipeDistance) != null ? _a : 50;
  const onTouchStart = (event) => {
    touchEnd.current = null;
    touchStart.current = event.targetTouches[0].clientX;
  };
  const onTouchMove = (event) => {
    touchEnd.current = event.targetTouches[0].clientX;
  };
  const onTouchEnd = React45.useCallback(() => {
    if (!touchStart.current || !touchEnd.current) {
      return;
    }
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe && options.onLeftSwipe)
      options.onLeftSwipe();
    if (isRightSwipe && options.onRightSwipe)
      options.onRightSwipe();
  }, [minSwipeDistance, options]);
  React45.useEffect(() => {
    const elementCopy = element.current;
    if (elementCopy) {
      elementCopy.addEventListener("touchstart", onTouchStart);
      elementCopy.addEventListener("touchmove", onTouchMove);
      elementCopy.addEventListener("touchend", onTouchEnd);
    }
    return () => {
      if (elementCopy) {
        elementCopy.removeEventListener("touchstart", onTouchStart);
        elementCopy.removeEventListener("touchmove", onTouchMove);
        elementCopy.removeEventListener("touchend", onTouchEnd);
      }
    };
  }, [element, onTouchEnd]);
}

// src/hooks/useFacingMode.ts
import { LocalTrackPublication, facingModeFromLocalTrack as facingModeFromLocalTrack2 } from "livekit-client";
function useFacingMode(trackReference) {
  if (trackReference.publication instanceof LocalTrackPublication) {
    const localTrack = trackReference.publication.track;
    if (localTrack) {
      const { facingMode } = facingModeFromLocalTrack2(localTrack);
      return facingMode;
    }
  }
  return "undefined";
}

// src/components/participant/AudioTrack.tsx
import * as React46 from "react";
import { log as log9 } from "@livekit/components-core";
import { RemoteAudioTrack } from "livekit-client";
function AudioTrack(_a) {
  var _b = _a, { onSubscriptionStatusChanged, volume } = _b, props = __objRest(_b, ["onSubscriptionStatusChanged", "volume"]);
  const { source, name, publication } = props;
  const mediaEl = React46.useRef(null);
  const participant = useEnsureParticipant(props.participant);
  const { elementProps, isSubscribed, track } = useMediaTrackBySourceOrName(
    { source, name, participant, publication },
    {
      element: mediaEl,
      props
    }
  );
  React46.useEffect(() => {
    onSubscriptionStatusChanged == null ? void 0 : onSubscriptionStatusChanged(!!isSubscribed);
  }, [isSubscribed, onSubscriptionStatusChanged]);
  React46.useEffect(() => {
    if (track === void 0 || volume === void 0) {
      return;
    }
    if (track instanceof RemoteAudioTrack) {
      track.setVolume(volume);
    } else {
      log9.warn("volume can only be set on remote audio tracks");
    }
  }, [volume, track]);
  return /* @__PURE__ */ React46.createElement("audio", __spreadValues({ ref: mediaEl }, elementProps));
}

// src/components/RoomAudioRenderer.tsx
var RoomAudioRenderer = () => {
  const tracks = useTracks([Track4.Source.Microphone, Track4.Source.ScreenShareAudio], {
    updateOnlyOn: []
  }).filter((ref) => !isLocal2(ref.participant));
  return /* @__PURE__ */ React47.createElement("div", { style: { display: "none" } }, tracks.map((trackRef) => /* @__PURE__ */ React47.createElement(AudioTrack, __spreadValues({ key: trackRef.publication.trackSid }, trackRef))));
};

// src/prefabs/ControlBar.tsx
import { Track as Track5 } from "livekit-client";
import * as React52 from "react";

// src/components/controls/DisconnectButton.tsx
import { ConnectionState } from "livekit-client";
import { setupDisconnectButton } from "@livekit/components-core";
import * as React49 from "react";

// src/components/ConnectionState.tsx
import { connectionStateObserver } from "@livekit/components-core";
import * as React48 from "react";
function useConnectionState(room) {
  const r = useEnsureRoom(room);
  const observable = React48.useMemo(() => connectionStateObserver(r), [r]);
  const connectionState = useObservableState(observable, r.state);
  return connectionState;
}

// src/components/controls/DisconnectButton.tsx
function useDisconnectButton(props) {
  const room = useRoomContext();
  const connectionState = useConnectionState(room);
  const buttonProps = React49.useMemo(() => {
    const { className, disconnect } = setupDisconnectButton(room);
    const mergedProps = mergeProps2(props, {
      className,
      onClick: () => {
        var _a;
        return disconnect((_a = props.stopTracks) != null ? _a : true);
      },
      disabled: connectionState === ConnectionState.Disconnected
    });
    return mergedProps;
  }, [room, props, connectionState]);
  return { buttonProps };
}
function DisconnectButton(props) {
  const { buttonProps } = useDisconnectButton(props);
  return /* @__PURE__ */ React49.createElement("button", __spreadValues({}, buttonProps), props.children);
}

// src/components/controls/StartAudio.tsx
import { setupStartAudio } from "@livekit/components-core";
import * as React50 from "react";
function useStartAudio({ room, props }) {
  const roomEnsured = useEnsureRoom(room);
  const { className, roomAudioPlaybackAllowedObservable, handleStartAudioPlayback } = React50.useMemo(
    () => setupStartAudio(),
    []
  );
  const observable = React50.useMemo(
    () => roomAudioPlaybackAllowedObservable(roomEnsured),
    [roomEnsured, roomAudioPlaybackAllowedObservable]
  );
  const { canPlayAudio } = useObservableState(observable, { canPlayAudio: false });
  const mergedProps = React50.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: () => {
        handleStartAudioPlayback(roomEnsured);
      },
      style: { display: canPlayAudio ? "none" : "block" }
    }),
    [props, className, canPlayAudio, handleStartAudioPlayback, roomEnsured]
  );
  return { mergedProps, canPlayAudio };
}
function StartAudio(_a) {
  var _b = _a, { label = "Allow Audio" } = _b, props = __objRest(_b, ["label"]);
  const room = useRoomContext();
  const { mergedProps } = useStartAudio({ room, props });
  return /* @__PURE__ */ React50.createElement("button", __spreadValues({}, mergedProps), label);
}

// src/components/controls/ChatToggle.tsx
import { setupChatToggle } from "@livekit/components-core";
import * as React51 from "react";
function useToggleChat({ props }) {
  const { dispatch, state } = useLayoutContext().widget;
  const { className } = React51.useMemo(() => setupChatToggle(), []);
  const mergedProps = React51.useMemo(
    () => mergeProps2(
      props,
      {
        className,
        onClick: () => {
          if (dispatch)
            dispatch({ msg: "toggle_chat" });
        }
      },
      { "aria-pressed": (state == null ? void 0 : state.showChat) ? "true" : "false" }
    ),
    [props, className, dispatch, state == null ? void 0 : state.showChat]
  );
  return { mergedProps };
}
function ChatToggle(props) {
  const { mergedProps } = useToggleChat({ props });
  return /* @__PURE__ */ React51.createElement("button", __spreadValues({}, mergedProps), props.children);
}

// src/prefabs/ControlBar.tsx
import { supportsScreenSharing } from "@livekit/components-core";
function ControlBar(_a) {
  var _b = _a, { variation, controls } = _b, props = __objRest(_b, ["variation", "controls"]);
  var _a2, _b2, _c, _d, _e;
  const [isChatOpen, setIsChatOpen] = React52.useState(false);
  const layoutContext = useMaybeLayoutContext();
  React52.useEffect(() => {
    var _a3, _b3;
    if (((_a3 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _a3.showChat) !== void 0) {
      setIsChatOpen((_b3 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _b3.showChat);
    }
  }, [(_a2 = layoutContext == null ? void 0 : layoutContext.widget.state) == null ? void 0 : _a2.showChat]);
  const isTooLittleSpace = useMediaQuery(`(max-width: ${isChatOpen ? 1e3 : 760}px)`);
  const defaultVariation = isTooLittleSpace ? "minimal" : "verbose";
  variation != null ? variation : variation = defaultVariation;
  const visibleControls = __spreadValues({ leave: true }, controls);
  const localPermissions = useLocalParticipantPermissions();
  if (!localPermissions) {
    visibleControls.camera = false;
    visibleControls.chat = false;
    visibleControls.microphone = false;
    visibleControls.screenShare = false;
  } else {
    (_b2 = visibleControls.camera) != null ? _b2 : visibleControls.camera = localPermissions.canPublish;
    (_c = visibleControls.microphone) != null ? _c : visibleControls.microphone = localPermissions.canPublish;
    (_d = visibleControls.screenShare) != null ? _d : visibleControls.screenShare = localPermissions.canPublish;
    (_e = visibleControls.chat) != null ? _e : visibleControls.chat = localPermissions.canPublishData && (controls == null ? void 0 : controls.chat);
  }
  const showIcon = React52.useMemo(
    () => variation === "minimal" || variation === "verbose",
    [variation]
  );
  const showText = React52.useMemo(
    () => variation === "textOnly" || variation === "verbose",
    [variation]
  );
  const browserSupportsScreenSharing = supportsScreenSharing();
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React52.useState(false);
  const onScreenShareChange = (enabled) => {
    setIsScreenShareEnabled(enabled);
  };
  return /* @__PURE__ */ React52.createElement("div", __spreadValues({ className: "lk-control-bar" }, props), visibleControls.microphone && /* @__PURE__ */ React52.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ React52.createElement(TrackToggle, { source: Track5.Source.Microphone, showIcon }, showText && "Microphone"), /* @__PURE__ */ React52.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React52.createElement(MediaDeviceMenu, { kind: "audioinput" }))), visibleControls.camera && /* @__PURE__ */ React52.createElement("div", { className: "lk-button-group" }, /* @__PURE__ */ React52.createElement(TrackToggle, { source: Track5.Source.Camera, showIcon }, showText && "Camera"), /* @__PURE__ */ React52.createElement("div", { className: "lk-button-group-menu" }, /* @__PURE__ */ React52.createElement(MediaDeviceMenu, { kind: "videoinput" }))), visibleControls.screenShare && browserSupportsScreenSharing && /* @__PURE__ */ React52.createElement(
    TrackToggle,
    {
      source: Track5.Source.ScreenShare,
      captureOptions: { audio: true, selfBrowserSurface: "include" },
      showIcon,
      onChange: onScreenShareChange
    },
    showText && (isScreenShareEnabled ? "Stop screen share" : "Share screen")
  ), visibleControls.chat && /* @__PURE__ */ React52.createElement(ChatToggle, null, showIcon && /* @__PURE__ */ React52.createElement(ChatIcon_default, null), showText && "Chat"), visibleControls.leave && /* @__PURE__ */ React52.createElement(DisconnectButton, null, showIcon && /* @__PURE__ */ React52.createElement(LeaveIcon_default, null), showText && "Leave"), /* @__PURE__ */ React52.createElement(StartAudio, { label: "Start Audio" }));
}

// src/components/layout/FocusLayout.tsx
import * as React59 from "react";

// src/components/participant/ParticipantTile.tsx
import * as React58 from "react";
import { Track as Track6 } from "livekit-client";
import { isParticipantSourcePinned, setupParticipantTile } from "@livekit/components-core";

// src/components/participant/ConnectionQualityIndicator.tsx
import * as React53 from "react";
import { setupConnectionQualityIndicator } from "@livekit/components-core";
import { ConnectionQuality as ConnectionQuality2 } from "livekit-client";
function useConnectionQualityIndicator(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const { className, connectionQualityObserver } = React53.useMemo(
    () => setupConnectionQualityIndicator(p),
    [p]
  );
  const quality = useObservableState(connectionQualityObserver, ConnectionQuality2.Unknown);
  return { className, quality };
}
function ConnectionQualityIndicator(props) {
  var _a;
  const { className, quality } = useConnectionQualityIndicator(props);
  const elementProps = React53.useMemo(() => {
    return __spreadProps(__spreadValues({}, mergeProps2(props, { className })), { "data-lk-quality": quality });
  }, [quality, props, className]);
  return /* @__PURE__ */ React53.createElement("div", __spreadValues({}, elementProps), (_a = props.children) != null ? _a : getConnectionQualityIcon(quality));
}

// src/components/participant/ParticipantName.tsx
import { participantInfoObserver, setupParticipantName } from "@livekit/components-core";
import * as React54 from "react";
function ParticipantName(_a) {
  var _b = _a, { participant } = _b, props = __objRest(_b, ["participant"]);
  const p = useEnsureParticipant(participant);
  const { className, infoObserver } = React54.useMemo(() => {
    return setupParticipantName(p);
  }, [p]);
  const { identity, name } = useObservableState(infoObserver, {
    name: p.name,
    identity: p.identity,
    metadata: p.metadata
  });
  const mergedProps = React54.useMemo(() => {
    return mergeProps2(props, { className, "data-lk-participant-name": name });
  }, [props, className, name]);
  return /* @__PURE__ */ React54.createElement("span", __spreadValues({}, mergedProps), name !== "" ? name : identity, props.children);
}

// src/components/participant/TrackMutedIndicator.tsx
import * as React55 from "react";
import { setupTrackMutedIndicator } from "@livekit/components-core";
var useTrackMutedIndicator = (source, options = {}) => {
  var _a;
  const p = useEnsureParticipant(options.participant);
  const { className, mediaMutedObserver } = React55.useMemo(
    () => setupTrackMutedIndicator(p, source),
    [p, source]
  );
  const isMuted = useObservableState(mediaMutedObserver, !!((_a = p.getTrack(source)) == null ? void 0 : _a.isMuted));
  return { isMuted, className };
};
var TrackMutedIndicator = (_a) => {
  var _b = _a, {
    source,
    participant,
    show = "always"
  } = _b, props = __objRest(_b, [
    "source",
    "participant",
    "show"
  ]);
  var _a2;
  const { className, isMuted } = useTrackMutedIndicator(source, { participant });
  const showIndicator = show === "always" || show === "muted" && isMuted || show === "unmuted" && !isMuted;
  const htmlProps = React55.useMemo(
    () => mergeProps2(props, {
      className
    }),
    [className, props]
  );
  if (!showIndicator) {
    return null;
  }
  return /* @__PURE__ */ React55.createElement("div", __spreadProps(__spreadValues({}, htmlProps), { "data-lk-muted": isMuted }), (_a2 = props.children) != null ? _a2 : getSourceIcon(source, !isMuted));
};

// src/components/controls/FocusToggle.tsx
import { isTrackReferencePinned, setupFocusToggle } from "@livekit/components-core";
import * as React56 from "react";
function useFocusToggle({ trackSource, participant, props }) {
  const p = useEnsureParticipant(participant);
  const layoutContext = useMaybeLayoutContext();
  const { className } = React56.useMemo(() => setupFocusToggle(), []);
  const inFocus = React56.useMemo(() => {
    const track = p.getTrack(trackSource);
    if ((layoutContext == null ? void 0 : layoutContext.pin.state) && track) {
      return isTrackReferencePinned(
        { participant: p, source: trackSource, publication: track },
        layoutContext.pin.state
      );
    } else {
      return false;
    }
  }, [p, trackSource, layoutContext]);
  const mergedProps = React56.useMemo(
    () => mergeProps2(props, {
      className,
      onClick: (event) => {
        var _a;
        (_a = props.onClick) == null ? void 0 : _a.call(props, event);
        const track = p.getTrack(trackSource);
        if ((layoutContext == null ? void 0 : layoutContext.pin.dispatch) && track) {
          if (inFocus) {
            layoutContext.pin.dispatch({
              msg: "clear_pin"
            });
          } else {
            layoutContext.pin.dispatch({
              msg: "set_pin",
              trackReference: {
                participant: p,
                publication: track,
                source: track.source
              }
            });
          }
        }
      }
    }),
    [props, className, p, trackSource, inFocus, layoutContext]
  );
  return { mergedProps, inFocus };
}
function FocusToggle(_a) {
  var _b = _a, { trackSource, participant } = _b, props = __objRest(_b, ["trackSource", "participant"]);
  const { mergedProps, inFocus } = useFocusToggle({ trackSource, participant, props });
  return /* @__PURE__ */ React56.createElement(LayoutContext.Consumer, null, (layoutContext) => layoutContext !== void 0 && /* @__PURE__ */ React56.createElement("button", __spreadValues({}, mergedProps), props.children ? props.children : inFocus ? /* @__PURE__ */ React56.createElement(UnfocusToggleIcon_default, null) : /* @__PURE__ */ React56.createElement(FocusToggleIcon_default, null)));
}

// src/components/participant/VideoTrack.tsx
import * as React57 from "react";
function VideoTrack(_a) {
  var _b = _a, {
    onTrackClick,
    onClick,
    onSubscriptionStatusChanged,
    name,
    publication,
    source
  } = _b, props = __objRest(_b, [
    "onTrackClick",
    "onClick",
    "onSubscriptionStatusChanged",
    "name",
    "publication",
    "source"
  ]);
  const mediaEl = React57.useRef(null);
  const participant = useEnsureParticipant(props.participant);
  const {
    elementProps,
    publication: pub,
    isSubscribed
  } = useMediaTrackBySourceOrName(
    { participant, name, source, publication },
    {
      element: mediaEl,
      props
    }
  );
  React57.useEffect(() => {
    onSubscriptionStatusChanged == null ? void 0 : onSubscriptionStatusChanged(!!isSubscribed);
  }, [isSubscribed, onSubscriptionStatusChanged]);
  const clickHandler = (evt) => {
    onClick == null ? void 0 : onClick(evt);
    onTrackClick == null ? void 0 : onTrackClick({ participant, track: pub });
  };
  return /* @__PURE__ */ React57.createElement("video", __spreadProps(__spreadValues({ ref: mediaEl }, elementProps), { muted: true, onClick: clickHandler }));
}

// src/components/participant/ParticipantTile.tsx
function useParticipantTile({
  participant,
  source,
  publication,
  onParticipantClick,
  disableSpeakingIndicator,
  htmlProps
}) {
  const p = useEnsureParticipant(participant);
  const mergedProps = React58.useMemo(() => {
    const { className } = setupParticipantTile();
    return mergeProps2(htmlProps, {
      className,
      onClick: (event) => {
        var _a;
        (_a = htmlProps.onClick) == null ? void 0 : _a.call(htmlProps, event);
        if (typeof onParticipantClick === "function") {
          const track = publication != null ? publication : p.getTrack(source);
          onParticipantClick({ participant: p, track });
        }
      }
    });
  }, [htmlProps, source, onParticipantClick, p, publication]);
  const isVideoMuted = useIsMuted(Track6.Source.Camera, { participant });
  const isAudioMuted = useIsMuted(Track6.Source.Microphone, { participant });
  const isSpeaking = useIsSpeaking(participant);
  const facingMode = useFacingMode({ participant, publication, source });
  return {
    elementProps: __spreadValues({
      "data-lk-audio-muted": isAudioMuted,
      "data-lk-video-muted": isVideoMuted,
      "data-lk-speaking": disableSpeakingIndicator === true ? false : isSpeaking,
      "data-lk-local-participant": participant.isLocal,
      "data-lk-source": source,
      "data-lk-facing-mode": facingMode
    }, mergedProps)
  };
}
function ParticipantContextIfNeeded(props) {
  const hasContext = !!useMaybeParticipantContext();
  return props.participant && !hasContext ? /* @__PURE__ */ React58.createElement(ParticipantContext.Provider, { value: props.participant }, props.children) : /* @__PURE__ */ React58.createElement(React58.Fragment, null, props.children);
}
var ParticipantTile = (_a) => {
  var _b = _a, {
    participant,
    children,
    source = Track6.Source.Camera,
    onParticipantClick,
    publication,
    disableSpeakingIndicator
  } = _b, htmlProps = __objRest(_b, [
    "participant",
    "children",
    "source",
    "onParticipantClick",
    "publication",
    "disableSpeakingIndicator"
  ]);
  var _a2, _b2;
  const p = useEnsureParticipant(participant);
  const trackRef = (_a2 = useMaybeTrackContext()) != null ? _a2 : {
    participant: p,
    source,
    publication
  };
  const { elementProps } = useParticipantTile({
    participant: trackRef.participant,
    htmlProps,
    source: trackRef.source,
    publication: trackRef.publication,
    disableSpeakingIndicator,
    onParticipantClick
  });
  const layoutContext = useMaybeLayoutContext();
  const handleSubscribe = React58.useCallback(
    (subscribed) => {
      if (trackRef.source && !subscribed && layoutContext && layoutContext.pin.dispatch && isParticipantSourcePinned(trackRef.participant, trackRef.source, layoutContext.pin.state)) {
        layoutContext.pin.dispatch({ msg: "clear_pin" });
      }
    },
    [trackRef.participant, layoutContext, trackRef.source]
  );
  return /* @__PURE__ */ React58.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React58.createElement(ParticipantContextIfNeeded, { participant: trackRef.participant }, children != null ? children : /* @__PURE__ */ React58.createElement(React58.Fragment, null, ((_b2 = trackRef.publication) == null ? void 0 : _b2.kind) === "video" || trackRef.source === Track6.Source.Camera || trackRef.source === Track6.Source.ScreenShare ? /* @__PURE__ */ React58.createElement(
    VideoTrack,
    {
      participant: trackRef.participant,
      source: trackRef.source,
      publication: trackRef.publication,
      onSubscriptionStatusChanged: handleSubscribe
    }
  ) : /* @__PURE__ */ React58.createElement(
    AudioTrack,
    {
      participant: trackRef.participant,
      source: trackRef.source,
      publication: trackRef.publication,
      onSubscriptionStatusChanged: handleSubscribe
    }
  ), /* @__PURE__ */ React58.createElement("div", { className: "lk-participant-placeholder" }, /* @__PURE__ */ React58.createElement(ParticipantPlaceholder_default, null)), /* @__PURE__ */ React58.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React58.createElement("div", { className: "lk-participant-metadata-item" }, trackRef.source === Track6.Source.Camera ? /* @__PURE__ */ React58.createElement(React58.Fragment, null, /* @__PURE__ */ React58.createElement(
    TrackMutedIndicator,
    {
      source: Track6.Source.Microphone,
      show: "muted"
    }
  ), /* @__PURE__ */ React58.createElement(ParticipantName, null)) : /* @__PURE__ */ React58.createElement(React58.Fragment, null, /* @__PURE__ */ React58.createElement(ScreenShareIcon_default, { style: { marginRight: "0.25rem" } }), /* @__PURE__ */ React58.createElement(ParticipantName, null, "'s screen"))), /* @__PURE__ */ React58.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" }))), /* @__PURE__ */ React58.createElement(FocusToggle, { trackSource: trackRef.source })));
};

// src/components/layout/FocusLayout.tsx
function FocusLayoutContainer(props) {
  const elementProps = mergeProps2(props, { className: "lk-focus-layout" });
  return /* @__PURE__ */ React59.createElement("div", __spreadValues({}, elementProps), props.children);
}
function FocusLayout(_a) {
  var _b = _a, { track } = _b, htmlProps = __objRest(_b, ["track"]);
  return /* @__PURE__ */ React59.createElement(ParticipantTile, __spreadValues(__spreadValues({}, track), htmlProps));
}

// src/components/layout/GridLayout.tsx
import * as React63 from "react";

// src/components/TrackLoop.tsx
import { isTrackReference as isTrackReference2 } from "@livekit/components-core";
import * as React60 from "react";
var TrackLoop = (_a) => {
  var _b = _a, { tracks } = _b, props = __objRest(_b, ["tracks"]);
  return /* @__PURE__ */ React60.createElement(React60.Fragment, null, tracks.map((trackReference) => {
    const trackSource = isTrackReference2(trackReference) ? trackReference.publication.source : trackReference.source;
    return /* @__PURE__ */ React60.createElement(
      TrackContext.Provider,
      {
        value: trackReference,
        key: `${trackReference.participant.identity}_${trackSource}`
      },
      cloneSingleChild(props.children)
    );
  }));
};

// src/components/controls/PaginationControl.tsx
import * as React61 from "react";
import { createInteractingObservable } from "@livekit/components-core";
function PaginationControl({
  totalPageCount,
  nextPage,
  prevPage,
  currentPage,
  pagesContainer: connectedElement
}) {
  const [interactive, setInteractive] = React61.useState(false);
  React61.useEffect(() => {
    let subscription;
    if (connectedElement) {
      subscription = createInteractingObservable(connectedElement.current, 2e3).subscribe(
        setInteractive
      );
    }
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [connectedElement]);
  return /* @__PURE__ */ React61.createElement("div", { className: "lk-pagination-control", "data-lk-user-interaction": interactive }, /* @__PURE__ */ React61.createElement("button", { className: "lk-button", onClick: prevPage }, /* @__PURE__ */ React61.createElement(Chevron_default, null)), /* @__PURE__ */ React61.createElement("span", { className: "lk-pagination-count" }, `${currentPage} of ${totalPageCount}`), /* @__PURE__ */ React61.createElement("button", { className: "lk-button", onClick: nextPage }, /* @__PURE__ */ React61.createElement(Chevron_default, null)));
}

// src/components/controls/PaginationIndicator.tsx
import * as React62 from "react";
function PaginationIndicator({ totalPageCount, currentPage }) {
  const bubbles = new Array(totalPageCount).fill("").map((_, index) => {
    if (index + 1 === currentPage) {
      return /* @__PURE__ */ React62.createElement("span", { "data-lk-active": true, key: index });
    } else {
      return /* @__PURE__ */ React62.createElement("span", { key: index });
    }
  });
  return /* @__PURE__ */ React62.createElement("div", { className: "lk-pagination-indicator" }, bubbles);
}

// src/components/layout/GridLayout.tsx
function GridLayout(_a) {
  var _b = _a, { tracks } = _b, props = __objRest(_b, ["tracks"]);
  const gridEl = React63.createRef();
  const elementProps = React63.useMemo(
    () => mergeProps2(props, { className: "lk-grid-layout" }),
    [props]
  );
  const { layout } = useGridLayout(gridEl, tracks.length);
  const pagination = usePagination(layout.maxTiles, tracks);
  useSwipe(gridEl, {
    onLeftSwipe: pagination.nextPage,
    onRightSwipe: pagination.prevPage
  });
  return /* @__PURE__ */ React63.createElement("div", __spreadValues({ ref: gridEl, "data-lk-pagination": pagination.totalPageCount > 1 }, elementProps), /* @__PURE__ */ React63.createElement(TrackLoop, { tracks: pagination.tracks }, props.children), tracks.length > layout.maxTiles && /* @__PURE__ */ React63.createElement(React63.Fragment, null, /* @__PURE__ */ React63.createElement(
    PaginationIndicator,
    {
      totalPageCount: pagination.totalPageCount,
      currentPage: pagination.currentPage
    }
  ), /* @__PURE__ */ React63.createElement(PaginationControl, __spreadValues({ pagesContainer: gridEl }, pagination))));
}

// src/prefabs/VideoConference.tsx
import { isEqualTrackRef, isTrackReference as isTrackReference3, log as log10, isWeb } from "@livekit/components-core";

// src/components/Toast.tsx
import { ConnectionState as ConnectionState2 } from "livekit-client";
import * as React64 from "react";
function Toast(props) {
  const htmlProps = React64.useMemo(() => mergeProps2(props, { className: "lk-toast" }), [props]);
  return /* @__PURE__ */ React64.createElement("div", __spreadValues({}, htmlProps), props.children);
}
function ConnectionStateToast(props) {
  const [notification, setNotification] = React64.useState(void 0);
  const state = useConnectionState(props.room);
  React64.useEffect(() => {
    switch (state) {
      case ConnectionState2.Reconnecting:
        setNotification(
          /* @__PURE__ */ React64.createElement(React64.Fragment, null, /* @__PURE__ */ React64.createElement(SpinnerIcon_default, { className: "lk-spinner" }), " Reconnecting")
        );
        break;
      case ConnectionState2.Connecting:
        setNotification(
          /* @__PURE__ */ React64.createElement(React64.Fragment, null, /* @__PURE__ */ React64.createElement(SpinnerIcon_default, { className: "lk-spinner" }), " Connecting")
        );
        break;
      case ConnectionState2.Disconnected:
        setNotification(/* @__PURE__ */ React64.createElement(React64.Fragment, null, "Disconnected"));
        break;
      default:
        setNotification(void 0);
        break;
    }
  }, [state]);
  return notification ? /* @__PURE__ */ React64.createElement(Toast, { className: "lk-toast-connection-state" }, notification) : /* @__PURE__ */ React64.createElement(React64.Fragment, null);
}

// src/prefabs/VideoConference.tsx
import { RoomEvent, Track as Track9 } from "livekit-client";

// src/components/layout/CarouselLayout.tsx
import { getScrollBarWidth } from "@livekit/components-core";
import * as React65 from "react";
var MIN_HEIGHT = 130;
var MIN_WIDTH = 140;
var MIN_VISIBLE_TILES = 1;
var ASPECT_RATIO = 16 / 10;
var ASPECT_RATIO_INVERT = (1 - ASPECT_RATIO) * -1;
function CarouselLayout(_a) {
  var _b = _a, { tracks, orientation } = _b, props = __objRest(_b, ["tracks", "orientation"]);
  const asideEl = React65.useRef(null);
  const [prevTiles, setPrevTiles] = React65.useState(0);
  const { width, height } = useSize(asideEl);
  const carouselOrientation = orientation ? orientation : height >= width ? "vertical" : "horizontal";
  const tileSpan = carouselOrientation === "vertical" ? Math.max(width * ASPECT_RATIO_INVERT, MIN_HEIGHT) : Math.max(height * ASPECT_RATIO, MIN_WIDTH);
  const scrollBarWidth = getScrollBarWidth();
  const tilesThatFit = carouselOrientation === "vertical" ? Math.max((height - scrollBarWidth) / tileSpan, MIN_VISIBLE_TILES) : Math.max((width - scrollBarWidth) / tileSpan, MIN_VISIBLE_TILES);
  let maxVisibleTiles = Math.round(tilesThatFit);
  if (Math.abs(tilesThatFit - prevTiles) < 0.5) {
    maxVisibleTiles = Math.round(prevTiles);
  } else if (prevTiles !== tilesThatFit) {
    setPrevTiles(tilesThatFit);
  }
  const sortedTiles = useVisualStableUpdate(tracks, maxVisibleTiles);
  React65.useLayoutEffect(() => {
    if (asideEl.current) {
      asideEl.current.dataset.lkOrientation = carouselOrientation;
      asideEl.current.style.setProperty("--lk-max-visible-tiles", maxVisibleTiles.toString());
    }
  }, [maxVisibleTiles, carouselOrientation]);
  return /* @__PURE__ */ React65.createElement("aside", __spreadValues({ key: carouselOrientation, className: "lk-carousel", ref: asideEl }, props), /* @__PURE__ */ React65.createElement(TrackLoop, { tracks: sortedTiles }, props.children));
}

// src/components/participant/AudioVisualizer.tsx
import { createAudioAnalyser, LocalAudioTrack, RemoteAudioTrack as RemoteAudioTrack2, Track as Track7 } from "livekit-client";
import * as React66 from "react";
function AudioVisualizer(_a) {
  var _b = _a, { participant } = _b, props = __objRest(_b, ["participant"]);
  const [volumeBars, setVolumeBars] = React66.useState([]);
  const svgWidth = 200;
  const svgHeight = 90;
  const barWidth = 6;
  const barSpacing = 4;
  const volMultiplier = 50;
  const barCount = 7;
  const { track } = useMediaTrack(Track7.Source.Microphone, participant);
  React66.useEffect(() => {
    if (!track || !(track instanceof LocalAudioTrack || track instanceof RemoteAudioTrack2)) {
      return;
    }
    const { analyser, cleanup } = createAudioAnalyser(track, {
      smoothingTimeConstant: 0.8,
      fftSize: 64
    });
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const calculateBars = () => {
      analyser.getByteFrequencyData(dataArray);
      const sums = new Array(barCount).fill(0);
      dataArray.slice(1);
      const binSize = 6;
      for (let i = 0; i < barCount / 2; i += 1) {
        const id = Math.floor(barCount / 2 - i);
        for (let k = 0; k < binSize; k += 1) {
          sums[id] += Math.pow(dataArray[i * binSize + k] / 255, 2);
        }
        sums[id] /= binSize;
      }
      for (let i = 0; i < barCount / 2; i += 1) {
        const id = Math.floor(barCount / 2 + i);
        if (sums[id] !== 0) {
          continue;
        }
        for (let k = 0; k < binSize; k += 1) {
          sums[id] += Math.pow(dataArray[i * binSize + k] / 255, 2);
        }
        sums[id] /= binSize;
      }
      return sums.map((s) => s * volMultiplier);
    };
    const calcInterval = setInterval(() => {
      const bars = calculateBars();
      setVolumeBars(bars);
    }, 100);
    return () => {
      clearInterval(calcInterval);
      cleanup();
    };
  }, [track]);
  return /* @__PURE__ */ React66.createElement(
    "svg",
    __spreadProps(__spreadValues({
      width: "100%",
      height: "100%",
      viewBox: `0 0 ${svgWidth} ${svgHeight}`
    }, props), {
      className: "lk-audio-visualizer"
    }),
    /* @__PURE__ */ React66.createElement("rect", { x: "0", y: "0", width: "100%", height: "100%" }),
    /* @__PURE__ */ React66.createElement(
      "g",
      {
        style: {
          transform: `translate(${(svgWidth - barCount * (barWidth + barSpacing)) / 2}px, 0)`
        }
      },
      volumeBars.map((vol, idx) => /* @__PURE__ */ React66.createElement(
        "rect",
        {
          key: idx,
          x: idx * (barWidth + barSpacing),
          y: svgHeight / 2 - vol / 2,
          width: barWidth,
          height: vol
        }
      ))
    )
  );
}

// src/components/ParticipantLoop.tsx
import * as React67 from "react";
var ParticipantLoop = (_a) => {
  var _b = _a, { participants } = _b, props = __objRest(_b, ["participants"]);
  return /* @__PURE__ */ React67.createElement(React67.Fragment, null, participants.map((participant) => /* @__PURE__ */ React67.createElement(ParticipantContext.Provider, { value: participant, key: participant.identity }, cloneSingleChild(props.children))));
};

// src/components/participant/ParticipantAudioTile.tsx
import * as React68 from "react";
import { Track as Track8 } from "livekit-client";
var ParticipantAudioTile = (_a) => {
  var _b = _a, {
    participant,
    children,
    source,
    publication,
    disableSpeakingIndicator,
    onParticipantClick
  } = _b, htmlProps = __objRest(_b, [
    "participant",
    "children",
    "source",
    "publication",
    "disableSpeakingIndicator",
    "onParticipantClick"
  ]);
  const p = useEnsureParticipant(participant);
  const { elementProps } = useParticipantTile({
    participant: p,
    htmlProps,
    disableSpeakingIndicator,
    source: Track8.Source.Microphone,
    publication,
    onParticipantClick
  });
  return /* @__PURE__ */ React68.createElement("div", __spreadValues({ style: { position: "relative" } }, elementProps), /* @__PURE__ */ React68.createElement(ParticipantContextIfNeeded, { participant: p }, children != null ? children : /* @__PURE__ */ React68.createElement(React68.Fragment, null, /* @__PURE__ */ React68.createElement(AudioTrack, { source: source != null ? source : Track8.Source.Microphone }), /* @__PURE__ */ React68.createElement(AudioVisualizer, null), /* @__PURE__ */ React68.createElement("div", { className: "lk-participant-metadata" }, /* @__PURE__ */ React68.createElement("div", { className: "lk-participant-metadata-item" }, /* @__PURE__ */ React68.createElement(TrackMutedIndicator, { source: Track8.Source.Microphone }), /* @__PURE__ */ React68.createElement(ParticipantName, null)), /* @__PURE__ */ React68.createElement(ConnectionQualityIndicator, { className: "lk-participant-metadata-item" })))));
};

// src/prefabs/VideoConference.tsx
function VideoConference(_a) {
  var _b = _a, { chatMessageFormatter } = _b, props = __objRest(_b, ["chatMessageFormatter"]);
  var _a2, _b2;
  const [widgetState, setWidgetState] = React69.useState({ showChat: false });
  const lastAutoFocusedScreenShareTrack = React69.useRef(null);
  const tracks = useTracks(
    [
      { source: Track9.Source.Camera, withPlaceholder: true },
      { source: Track9.Source.ScreenShare, withPlaceholder: false }
    ],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged] }
  );
  const widgetUpdate = (state) => {
    log10.debug("updating widget state", state);
    setWidgetState(state);
  };
  const layoutContext = useCreateLayoutContext();
  const screenShareTracks = tracks.filter(isTrackReference3).filter((track) => track.publication.source === Track9.Source.ScreenShare);
  const focusTrack = (_a2 = usePinnedTracks(layoutContext)) == null ? void 0 : _a2[0];
  const carouselTracks = tracks.filter((track) => !isEqualTrackRef(track, focusTrack));
  React69.useEffect(() => {
    var _a3, _b3, _c, _d;
    if (screenShareTracks.length > 0 && lastAutoFocusedScreenShareTrack.current === null) {
      log10.debug("Auto set screen share focus:", { newScreenShareTrack: screenShareTracks[0] });
      (_b3 = (_a3 = layoutContext.pin).dispatch) == null ? void 0 : _b3.call(_a3, { msg: "set_pin", trackReference: screenShareTracks[0] });
      lastAutoFocusedScreenShareTrack.current = screenShareTracks[0];
    } else if (lastAutoFocusedScreenShareTrack.current && !screenShareTracks.some(
      (track) => {
        var _a4, _b4;
        return track.publication.trackSid === ((_b4 = (_a4 = lastAutoFocusedScreenShareTrack.current) == null ? void 0 : _a4.publication) == null ? void 0 : _b4.trackSid);
      }
    )) {
      log10.debug("Auto clearing screen share focus.");
      (_d = (_c = layoutContext.pin).dispatch) == null ? void 0 : _d.call(_c, { msg: "clear_pin" });
      lastAutoFocusedScreenShareTrack.current = null;
    }
  }, [
    screenShareTracks.map((ref) => ref.publication.trackSid).join(),
    (_b2 = focusTrack == null ? void 0 : focusTrack.publication) == null ? void 0 : _b2.trackSid
  ]);
  return /* @__PURE__ */ React69.createElement("div", __spreadValues({ className: "lk-video-conference" }, props), isWeb() && /* @__PURE__ */ React69.createElement(
    LayoutContextProvider,
    {
      value: layoutContext,
      onWidgetChange: widgetUpdate
    },
    /* @__PURE__ */ React69.createElement("div", { className: "lk-video-conference-inner" }, !focusTrack ? /* @__PURE__ */ React69.createElement("div", { className: "lk-grid-layout-wrapper" }, /* @__PURE__ */ React69.createElement(GridLayout, { tracks }, /* @__PURE__ */ React69.createElement(ParticipantTile, null))) : /* @__PURE__ */ React69.createElement("div", { className: "lk-focus-layout-wrapper" }, /* @__PURE__ */ React69.createElement(FocusLayoutContainer, null, /* @__PURE__ */ React69.createElement(CarouselLayout, { tracks: carouselTracks }, /* @__PURE__ */ React69.createElement(ParticipantTile, null)), focusTrack && /* @__PURE__ */ React69.createElement(FocusLayout, { track: focusTrack }))), /* @__PURE__ */ React69.createElement(ControlBar, { controls: { chat: true } })),
    /* @__PURE__ */ React69.createElement(
      Chat,
      {
        style: { display: widgetState.showChat ? "flex" : "none" },
        messageFormatter: chatMessageFormatter
      }
    )
  ), /* @__PURE__ */ React69.createElement(RoomAudioRenderer, null), /* @__PURE__ */ React69.createElement(ConnectionStateToast, null));
}

// src/prefabs/AudioConference.tsx
import * as React70 from "react";
function AudioConference(_a) {
  var props = __objRest(_a, []);
  const [widgetState, setWidgetState] = React70.useState({ showChat: false });
  const participants = useParticipants();
  return /* @__PURE__ */ React70.createElement(LayoutContextProvider, { onWidgetChange: setWidgetState }, /* @__PURE__ */ React70.createElement("div", __spreadValues({ className: "lk-audio-conference" }, props), /* @__PURE__ */ React70.createElement("div", { className: "lk-audio-conference-stage" }, /* @__PURE__ */ React70.createElement(ParticipantLoop, { participants }, /* @__PURE__ */ React70.createElement(ParticipantAudioTile, null))), /* @__PURE__ */ React70.createElement(
    ControlBar,
    {
      controls: { microphone: true, screenShare: false, camera: false, chat: true }
    }
  ), widgetState.showChat && /* @__PURE__ */ React70.createElement(Chat, null)));
}
export {
  AudioConference,
  Chat,
  ChatEntry,
  ControlBar,
  MediaDeviceMenu,
  PreJoin,
  VideoConference,
  formatChatMessageLinks,
  useChat,
  usePreviewDevice,
  usePreviewTracks
};
//# sourceMappingURL=index.mjs.map