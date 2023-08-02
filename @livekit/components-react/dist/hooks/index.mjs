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

// src/hooks/useAudioPlayback.ts
import * as React7 from "react";

// src/hooks/internal/useResizeObserver.ts
import * as React from "react";
import useLatest from "@react-hook/latest";
function useResizeObserver(target, callback) {
  const resizeObserver = getResizeObserver();
  const storedCallback = useLatest(callback);
  React.useLayoutEffect(() => {
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
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  React.useLayoutEffect(() => {
    if (target.current) {
      const { width, height } = target.current.getBoundingClientRect();
      setSize({ width, height });
    }
  }, [target.current]);
  const resizeCallback = React.useCallback(
    (entry) => setSize(entry.contentRect),
    []
  );
  useResizeObserver(target, resizeCallback);
  return size;
};

// src/hooks/internal/useObservableState.ts
import * as React2 from "react";
function useObservableState(observable, startWith) {
  const [state, setState] = React2.useState(startWith);
  React2.useEffect(() => {
    if (typeof window === "undefined" || !observable)
      return;
    const subscription = observable.subscribe(setState);
    return () => subscription.unsubscribe();
  }, [observable]);
  return state;
}

// src/hooks/useAudioPlayback.ts
import { roomAudioPlaybackAllowedObservable } from "@livekit/components-core";

// src/context/layout-context.ts
import { PIN_DEFAULT_STATE, WIDGET_DEFAULT_STATE } from "@livekit/components-core";
import * as React3 from "react";
var LayoutContext = React3.createContext(void 0);
function useEnsureLayoutContext(layoutContext) {
  const layout = useMaybeLayoutContext();
  layoutContext != null ? layoutContext : layoutContext = layout;
  if (!layoutContext) {
    throw Error("Tried to access LayoutContext context outside a LayoutContextProvider provider.");
  }
  return layoutContext;
}
function useMaybeLayoutContext() {
  return React3.useContext(LayoutContext);
}

// src/context/participant-context.ts
import * as React5 from "react";

// src/context/track-context.ts
import * as React4 from "react";
var TrackContext = React4.createContext(void 0);
function useMaybeTrackContext() {
  return React4.useContext(TrackContext);
}

// src/context/participant-context.ts
var ParticipantContext = React5.createContext(void 0);
function useMaybeParticipantContext() {
  return React5.useContext(ParticipantContext);
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
import * as React6 from "react";
var RoomContext = React6.createContext(void 0);
function useRoomContext() {
  const ctx = React6.useContext(RoomContext);
  if (!ctx) {
    throw Error("tried to access room context outside of livekit room component");
  }
  return ctx;
}
function useMaybeRoomContext() {
  return React6.useContext(RoomContext);
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

// src/hooks/useAudioPlayback.ts
function useAudioPlayback(room) {
  const roomEnsured = useEnsureRoom(room);
  const startAudio = React7.useCallback(() => __async(this, null, function* () {
    yield roomEnsured.startAudio();
  }), [roomEnsured]);
  const observable = React7.useMemo(
    () => roomAudioPlaybackAllowedObservable(roomEnsured),
    [roomEnsured]
  );
  const { canPlayAudio } = useObservableState(observable, {
    canPlayAudio: roomEnsured.canPlaybackAudio
  });
  return { canPlayAudio, startAudio };
}

// src/hooks/useDataChannel.ts
import { setupDataMessageHandler } from "@livekit/components-core";
import * as React8 from "react";
function useDataChannel(topicOrCallback, callback) {
  const onMessage = typeof topicOrCallback === "function" ? topicOrCallback : callback;
  const topic = typeof topicOrCallback === "string" ? topicOrCallback : void 0;
  const room = useRoomContext();
  const { send, messageObservable, isSendingObservable } = React8.useMemo(
    () => setupDataMessageHandler(room, topic, onMessage),
    [room, topic, onMessage]
  );
  const message = useObservableState(messageObservable, void 0);
  const isSending = useObservableState(isSendingObservable, false);
  return {
    message,
    send,
    isSending
  };
}

// src/hooks/useGridLayout.ts
import { GRID_LAYOUTS, selectGridLayout } from "@livekit/components-core";
import * as React9 from "react";
function useGridLayout(gridElement, trackCount) {
  const { width, height } = useSize(gridElement);
  const layout = width > 0 && height > 0 ? selectGridLayout(GRID_LAYOUTS, trackCount, width, height) : GRID_LAYOUTS[0];
  React9.useEffect(() => {
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
import * as React10 from "react";
function useIsMuted(source, options = {}) {
  var _a;
  const p = useEnsureParticipant(options.participant);
  const [isMuted, setIsMuted] = React10.useState(!!((_a = p.getTrack(source)) == null ? void 0 : _a.isMuted));
  React10.useEffect(() => {
    const listener = mutedObserver(p, source).subscribe(setIsMuted);
    return () => listener.unsubscribe();
  }, [p, source]);
  return isMuted;
}

// src/hooks/useIsSpeaking.ts
import { createIsSpeakingObserver } from "@livekit/components-core";
import * as React11 from "react";
function useIsSpeaking(participant) {
  const p = useEnsureParticipant(participant);
  const observable = React11.useMemo(() => createIsSpeakingObserver(p), [p]);
  const isSpeaking = useObservableState(observable, p.isSpeaking);
  return isSpeaking;
}

// src/hooks/useLocalParticipant.ts
import { observeParticipantMedia } from "@livekit/components-core";
import * as React12 from "react";
var useLocalParticipant = (options = {}) => {
  const room = useEnsureRoom(options.room);
  const [localParticipant, setLocalParticipant] = React12.useState(room.localParticipant);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = React12.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isCameraEnabled, setIsCameraEnabled] = React12.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [isScreenShareEnabled, setIsScreenShareEnabled] = React12.useState(
    localParticipant.isMicrophoneEnabled
  );
  const [microphoneTrack, setMicrophoneTrack] = React12.useState(
    void 0
  );
  const [cameraTrack, setCameraTrack] = React12.useState(void 0);
  const handleUpdate = (media) => {
    setIsCameraEnabled(media.isCameraEnabled);
    setIsMicrophoneEnabled(media.isMicrophoneEnabled);
    setIsScreenShareEnabled(media.isScreenShareEnabled);
    setCameraTrack(media.cameraTrack);
    setMicrophoneTrack(media.microphoneTrack);
    setLocalParticipant(media.participant);
  };
  React12.useEffect(() => {
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
import * as React13 from "react";
function useLocalParticipantPermissions() {
  const room = useRoomContext();
  const permissionObserver = React13.useMemo(
    () => participantPermissionObserver(room.localParticipant),
    [room]
  );
  const permissions = useObservableState(permissionObserver, room.localParticipant.permissions);
  return permissions;
}

// src/hooks/useMediaTrackBySourceOrName.ts
import { isTrackReference } from "@livekit/components-core";
import { setupMediaTrack, log, isLocal, getTrackByIdentifier } from "@livekit/components-core";
import * as React15 from "react";

// src/utils.ts
import * as React14 from "react";

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

// src/hooks/useMediaTrackBySourceOrName.ts
function useMediaTrackBySourceOrName(observerOptions, options = {}) {
  const [publication, setPublication] = React15.useState(getTrackByIdentifier(observerOptions));
  const [isMuted, setMuted] = React15.useState(publication == null ? void 0 : publication.isMuted);
  const [isSubscribed, setSubscribed] = React15.useState(publication == null ? void 0 : publication.isSubscribed);
  const [track, setTrack] = React15.useState(publication == null ? void 0 : publication.track);
  const [orientation, setOrientation] = React15.useState("landscape");
  const previousElement = React15.useRef();
  const { className, trackObserver } = React15.useMemo(() => {
    return setupMediaTrack(observerOptions);
  }, [
    observerOptions.participant.identity,
    observerOptions.source,
    isTrackReference(observerOptions) && observerOptions.publication.trackSid
  ]);
  React15.useEffect(() => {
    const subscription = trackObserver.subscribe((publication2) => {
      log.debug("update track", publication2);
      setPublication(publication2);
      setMuted(publication2 == null ? void 0 : publication2.isMuted);
      setSubscribed(publication2 == null ? void 0 : publication2.isSubscribed);
      setTrack(publication2 == null ? void 0 : publication2.track);
    });
    return () => subscription == null ? void 0 : subscription.unsubscribe();
  }, [trackObserver]);
  React15.useEffect(() => {
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
  React15.useEffect(() => {
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

// src/hooks/useMediaTrackByName.ts
function useMediaTrackByName(name, participant, options = {}) {
  const p = useEnsureParticipant(participant);
  return useMediaTrackBySourceOrName({ name, participant: p }, options);
}

// src/hooks/usePagination.ts
import * as React17 from "react";

// src/hooks/useVisualStableUpdate.ts
import { log as log2, sortTrackReferences, updatePages } from "@livekit/components-core";
import * as React16 from "react";
function useVisualStableUpdate(trackReferences, maxItemsOnPage, options = {}) {
  const lastTrackRefs = React16.useRef([]);
  const lastMaxItemsOnPage = React16.useRef(-1);
  const layoutChanged = maxItemsOnPage !== lastMaxItemsOnPage.current;
  const sortedTrackRefs = typeof options.customSortFunction === "function" ? options.customSortFunction(trackReferences) : sortTrackReferences(trackReferences);
  let updatedTrackRefs = [...sortedTrackRefs];
  if (layoutChanged === false) {
    try {
      updatedTrackRefs = updatePages(lastTrackRefs.current, sortedTrackRefs, maxItemsOnPage);
    } catch (error) {
      log2.error("Error while running updatePages(): ", error);
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
  const [currentPage, setCurrentPage] = React17.useState(1);
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

// src/hooks/useParticipantPermissions.ts
import * as React18 from "react";
import { participantPermissionObserver as participantPermissionObserver2 } from "@livekit/components-core";
function useParticipantPermissions(options = {}) {
  const p = useEnsureParticipant(options.participant);
  const permissionObserver = React18.useMemo(() => participantPermissionObserver2(p), [p]);
  const permissions = useObservableState(permissionObserver, p.permissions);
  return permissions;
}

// src/hooks/useRemoteParticipants.ts
import { connectedParticipantsObserver } from "@livekit/components-core";
import * as React19 from "react";
var useRemoteParticipants = (options = {}) => {
  const room = useEnsureRoom(options.room);
  const [participants, setParticipants] = React19.useState([]);
  React19.useEffect(() => {
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

// src/hooks/useRemoteParticipant.ts
import { connectedParticipantObserver } from "@livekit/components-core";
import * as React20 from "react";
var useRemoteParticipant = (identity, options = {}) => {
  const room = useRoomContext();
  const [updateOnlyOn] = React20.useState(options.updateOnlyOn);
  const observable = React20.useMemo(
    () => connectedParticipantObserver(room, identity, { additionalEvents: updateOnlyOn }),
    [room, identity, updateOnlyOn]
  );
  const participant = useObservableState(
    observable,
    room.getParticipantByIdentity(identity)
  );
  return participant;
};

// src/hooks/useSortedParticipants.ts
import { sortParticipants } from "@livekit/components-core";
import * as React22 from "react";

// src/hooks/useSpeakingParticipants.ts
import { activeSpeakerObserver } from "@livekit/components-core";
import * as React21 from "react";
var useSpeakingParticipants = () => {
  const room = useRoomContext();
  const speakerObserver = React21.useMemo(() => activeSpeakerObserver(room), [room]);
  const activeSpeakers = useObservableState(speakerObserver, room.activeSpeakers);
  return activeSpeakers;
};

// src/hooks/useSortedParticipants.ts
function useSortedParticipants(participants) {
  const [sortedParticipants, setSortedParticipants] = React22.useState(
    sortParticipants(participants)
  );
  const activeSpeakers = useSpeakingParticipants();
  React22.useEffect(() => {
    setSortedParticipants(sortParticipants(participants));
  }, [activeSpeakers, participants]);
  return sortedParticipants;
}

// src/hooks/useToken.ts
import { log as log3 } from "@livekit/components-core";
import * as React23 from "react";
function useToken(tokenEndpoint, roomName, options = {}) {
  const [token, setToken] = React23.useState(void 0);
  React23.useEffect(() => {
    var _a;
    if (tokenEndpoint === void 0) {
      throw Error("token endpoint needs to be defined");
    }
    if (((_a = options.userInfo) == null ? void 0 : _a.identity) === void 0) {
      return;
    }
    const tokenFetcher = () => __async(this, null, function* () {
      log3.debug("fetching token");
      const params = new URLSearchParams(__spreadProps(__spreadValues({}, options.userInfo), { roomName }));
      const res = yield fetch(`${tokenEndpoint}?${params.toString()}`);
      const { accessToken } = yield res.json();
      setToken(accessToken);
    });
    tokenFetcher();
  }, [tokenEndpoint, roomName, options]);
  return token;
}

// src/hooks/useTracks.ts
import {
  isSourcesWithOptions,
  isSourceWitOptions,
  log as log4,
  trackReferencesObservable
} from "@livekit/components-core";
import { Track } from "livekit-client";
import * as React24 from "react";
function useTracks(sources = [
  Track.Source.Camera,
  Track.Source.Microphone,
  Track.Source.ScreenShare,
  Track.Source.ScreenShareAudio,
  Track.Source.Unknown
], options = {}) {
  const room = useEnsureRoom(options.room);
  const [trackReferences, setTrackReferences] = React24.useState([]);
  const [participants, setParticipants] = React24.useState([]);
  const sources_ = React24.useMemo(() => {
    return sources.map((s) => isSourceWitOptions(s) ? s.source : s);
  }, [JSON.stringify(sources)]);
  React24.useEffect(() => {
    const subscription = trackReferencesObservable(room, sources_, {
      additionalRoomEvents: options.updateOnlyOn,
      onlySubscribed: options.onlySubscribed
    }).subscribe(({ trackReferences: trackReferences2, participants: participants2 }) => {
      log4.debug("setting track bundles", trackReferences2, participants2);
      setTrackReferences(trackReferences2);
      setParticipants(participants2);
    });
    return () => subscription.unsubscribe();
  }, [room, JSON.stringify(options.updateOnlyOn), JSON.stringify(sources)]);
  const maybeTrackReferences = React24.useMemo(() => {
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
            log4.debug(
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
import * as React25 from "react";
function usePinnedTracks(layoutContext) {
  layoutContext = useEnsureLayoutContext(layoutContext);
  return React25.useMemo(() => {
    if ((layoutContext == null ? void 0 : layoutContext.pin.state) !== void 0 && layoutContext.pin.state.length >= 1) {
      return layoutContext.pin.state;
    }
    return [];
  }, [layoutContext.pin.state]);
}

// src/hooks/useSwipe.ts
import * as React26 from "react";
function useSwipe(element, options = {}) {
  var _a;
  const touchStart = React26.useRef(null);
  const touchEnd = React26.useRef(null);
  const minSwipeDistance = (_a = options.minSwipeDistance) != null ? _a : 50;
  const onTouchStart = (event) => {
    touchEnd.current = null;
    touchStart.current = event.targetTouches[0].clientX;
  };
  const onTouchMove = (event) => {
    touchEnd.current = event.targetTouches[0].clientX;
  };
  const onTouchEnd = React26.useCallback(() => {
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
  React26.useEffect(() => {
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
import { LocalTrackPublication, facingModeFromLocalTrack } from "livekit-client";
function useFacingMode(trackReference) {
  if (trackReference.publication instanceof LocalTrackPublication) {
    const localTrack = trackReference.publication.track;
    if (localTrack) {
      const { facingMode } = facingModeFromLocalTrack(localTrack);
      return facingMode;
    }
  }
  return "undefined";
}
export {
  useAudioPlayback,
  useDataChannel,
  useFacingMode,
  useGridLayout,
  useIsMuted,
  useIsSpeaking,
  useLocalParticipant,
  useLocalParticipantPermissions,
  useMediaTrack,
  useMediaTrackByName,
  usePagination,
  useParticipantPermissions,
  useParticipants,
  usePinnedTracks,
  useRemoteParticipant,
  useRemoteParticipants,
  useSortedParticipants,
  useSpeakingParticipants,
  useSwipe,
  useToken,
  useTracks,
  useVisualStableUpdate
};
//# sourceMappingURL=index.mjs.map