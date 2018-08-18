import React, { Component } from "react";
import { isNil } from "lodash";
import { Segment } from "semantic-ui-react";

interface Props {
  signalQualityObservable: any;
}

class SignalQualityIndicatorComponent extends Component<Props> {
  constructor(props) {
    super(props);
    this.signalQualitySubscription = null;
  }

  componentDidMount() {
    this.subscribeToObservable(this.props.signalQualityObservable);
  }

  componentDidUpdate(prevProps: Props) {
    if (
      this.props.signalQualityObservable !== prevProps.signalQualityObservable
    ) {
      this.subscribeToObservable(this.props.signalQualityObservable);
    }
  }

  componentWillUnmount(){
    this.signalQualitySubscription.unsubscribe();
  }

  subscribeToObservable(observable: any) {
    if (!isNil(this.signalQualitySubscription)) {
      this.signalQualitySubscription.unsubscribe();
    }

    this.signalQualitySubscription = observable.subscribe(
      epoch => {
        console.log(epoch.signalQuality);
      },
      error => new Error("Error in viewer subscription: ", error)
    );
  }

  render() {
    return (
      <Segment>
        <p>Signal Quality Indicator</p>
      </Segment>
    );
  }
}

export default SignalQualityIndicatorComponent;
