// @flow
import {
  SET_TIMELINE,
  SET_IS_RUNNING,
  SET_SESSION
} from "../epics/experimentEpics";
import {
  SET_TYPE,
  SET_SUBJECT,
  SET_TITLE,
  SET_EXPERIMENT_STATE
} from "../actions/experimentActions";
import { EXPERIMENTS } from "../constants/constants";
import {
  MainTimeline,
  Trial,
  Timeline,
  ActionType
} from "../constants/interfaces";

export interface ExperimentStateType {
  +type: ?EXPERIMENTS;
  +title: ?string;
  +mainTimeline: MainTimeline;
  +trials: { [string]: Trial };
  +timelines: {};
  +plugins: Object;
  +subject: string;
  +session: number;
  +isRunning: boolean;
}

const initialState = {
  type: EXPERIMENTS.NONE,
  title: "Test Experiment",
  mainTimeline: [],
  trials: {},
  timelines: {},
  plugins: {},
  subject: "",
  session: 1,
  isRunning: false
};

export default function experiment(
  state: ExperimentStateType = initialState,
  action: ActionType
) {
  switch (action.type) {
    case SET_TYPE:
      return {
        ...state,
        type: action.payload
      };

    case SET_SUBJECT:
      return {
        ...state,
        subject: action.payload
      };

    case SET_SESSION:
      return {
        ...state,
        session: action.payload
      };

    case SET_TIMELINE:
      return {
        ...state,
        ...action.payload
      };

    case SET_TITLE:
      return {
        ...state,
        title: action.payload
      };

    case SET_IS_RUNNING:
      return {
        ...state,
        isRunning: action.payload
      };

    case SET_EXPERIMENT_STATE:
      return {
        ...action.payload
      };
    default:
      return state;
  }
}
