import { ADD_PEER, REMOVE_PEER } from "../Actions/peerAction";

export type PeerState = Record<string, { stream: MediaStream }>;

type PeerAction =
  | {
      type: typeof ADD_PEER;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { peerId: string };
    };

export const peerReducer = (
  state: PeerState,
  action: PeerAction
): PeerState => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream,
        },
      };
    case REMOVE_PEER: {
      // immutably remove the peer by id
      const { peerId } = action.payload;

      // remove and keep the rest
      const { [peerId]: removed, ...rest } = state;

      // if there was a MediaStream for this peer, stop its tracks to free resources
      try {
        if (removed && removed.stream) {
          removed.stream.getTracks().forEach((track) => track.stop());
        }
      } catch {
        // ignore any errors when stopping tracks
      }

      return rest;
    }
    default:
      return { ...state };
  }
};
