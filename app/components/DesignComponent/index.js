// @flow
import React, { Component } from 'react';
import { Grid, Button, Segment, Header, Image } from 'semantic-ui-react';
import { isNil } from 'lodash';
import styles from '../styles/common.css';
import { EXPERIMENTS, SCREENS } from '../../constants/constants';
import {
  MainTimeline,
  Trial,
  ExperimentParameters,
  ExperimentDescription
} from '../../constants/interfaces';
import SecondaryNavComponent from '../SecondaryNavComponent';
import PreviewExperimentComponent from '../PreviewExperimentComponent';
import CustomDesign from './CustomDesignComponent';
import PreviewButton from '../PreviewButtonComponent';
import facesHousesOverview from '../../assets/common/FacesHouses_Overview.png';

const DESIGN_STEPS = {
  OVERVIEW: 'OVERVIEW',
  BACKGROUND: 'BACKGROUND',
  PROTOCOL: 'PROTOCOL'
};

interface Props {
  history: Object;
  type: EXPERIMENTS;
  title: string;
  params: ExperimentParameters;
  mainTimeline: MainTimeline;
  trials: { [string]: Trial };
  timelines: {};
  experimentActions: Object;
  description: ExperimentDescription;
}

interface State {
  activeStep: string;
  isPreviewing: boolean;
}

export default class Design extends Component<Props, State> {
  props: Props;
  state: State;
  handleStepClick: (Object, Object) => void;
  handleStartExperiment: Object => void;
  handlePreview: () => void;

  constructor(props: Props) {
    super(props);
    this.state = {
      activeStep: DESIGN_STEPS.OVERVIEW,
      isPreviewing: false
    };
    this.handleStepClick = this.handleStepClick.bind(this);
    this.handleStartExperiment = this.handleStartExperiment.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    if (isNil(props.params)) {
      props.experimentActions.loadDefaultTimeline();
    }
  }

  handleStepClick(step: string) {
    this.setState({ activeStep: step });
  }

  handleStartExperiment() {
    this.props.history.push(SCREENS.COLLECT.route);
  }

  handlePreview() {
    this.setState({ isPreviewing: !this.state.isPreviewing });
  }

  renderSectionContent() {
    switch (this.state.activeStep) {
      case DESIGN_STEPS.BACKGROUND:
        return (
          <Grid stretched relaxed padded className={styles.contentGrid}>
            <Grid.Column
              stretched
              width={6}
              textAlign="right"
              verticalAlign="middle"
            >
              <Header as="h1">The N170 ERP</Header>
            </Grid.Column>
            <Grid.Column stretched width={6} verticalAlign="middle">
              <Segment basic>
              <p>The N170 is a large negative event-related potential (ERP)
                component that occurs around 170ms after the detection of faces, but not
                objects, scrambled faces, or other body parts such as hands. The
                The N170 is most easily detected at lateral posterior electrodes.</p>
              <p>Although there is no consensus on the specific source of the N170, researchers
                believe it is related to activity in the fusiform face area, an
                area of the brain that shows a similar response pattern and is
                involved in encoding the holistic representation of a face (i.e
                eyes, nose mouth all arranged in the appropriate way).</p>

              </Segment>

            </Grid.Column>
          </Grid>
        );
      case DESIGN_STEPS.PROTOCOL:
        return (
          <Grid relaxed padded className={styles.contentGrid}>
            <Grid.Column
              stretched
              width={6}
              textAlign="right"
              verticalAlign="middle"
              className={styles.jsPsychColumn}
            >
              <PreviewExperimentComponent
                params={this.props.params}
                mainTimeline={this.props.mainTimeline}
                trials={this.props.trials}
                timelines={this.props.timelines}
                isPreviewing={this.state.isPreviewing}
              />
            </Grid.Column>
            <Grid.Column width={6} verticalAlign="middle">
              <p>
                Subjects will view a series of images of{' '}
                <b> faces and houses</b> for <b>120 seconds</b>
              </p>
              <p>
                Subjects will mentally note which stimulus they are perceiving
              </p>
              <PreviewButton
                isPreviewing={this.state.isPreviewing}
                onClick={this.handlePreview}
              />
            </Grid.Column>
          </Grid>
        );
      case DESIGN_STEPS.OVERVIEW:
      default:
        return (
          <Grid stretched relaxed padded className={styles.contentGrid}>
            <Grid.Column width={3}>
              <Segment basic padded>
                <Image src={facesHousesOverview} />
              </Segment>
            </Grid.Column>
            <Grid.Column
              stretched
              width={3}
              textAlign="right"
              verticalAlign="middle"
            >
              <Header as="h1">{this.props.type}</Header>
            </Grid.Column>
            <Grid.Column stretched width={6} verticalAlign="middle">
              <Segment as="p" basic>
                Faces contain a lot of information that is relevant to our
                survival. It
                {"'"}s important to be able to quickly recognize people you can
                trust and read emotions in both strangers and people you know
              </Segment>
            </Grid.Column>
          </Grid>
        );
    }
  }

  render() {
    if (this.props.type === EXPERIMENTS.CUSTOM) {
      return <CustomDesign {...this.props} />;
    }
    return (
      <div className={styles.mainContainer}>
        <SecondaryNavComponent
          title="Experiment Design"
          steps={DESIGN_STEPS}
          activeStep={this.state.activeStep}
          onStepClick={this.handleStepClick}
          button={
            <Button primary onClick={this.handleStartExperiment}>
              Collect Data
            </Button>
          }
        />
        {this.renderSectionContent()}
      </div>
    );
  }
}
