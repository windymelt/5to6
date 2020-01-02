import * as React from 'react';
import * as ReactDOM from 'react-dom';

interface AppProps {
    content: string
}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
    constructor(props: AppProps) {
        super(props)
    }

    render(): JSX.Element {
    return <p>{this.props.content}</p>
    }
}

// initialize
ReactDOM.render(
    <App content="Hello!!" />,
    document.querySelector('.content'),
  );
