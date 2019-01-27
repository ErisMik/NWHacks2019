import React from "react";
import Websocket from "react-websocket";
import "./App.css";
import Tag from "./Components/Tag";
import Line from "./Components/Line";

const None = "lol";

const testData = {
  transcript: [
    {
      speaker: "justin",
      line: " The REST request made is wrong.\n",
      item: None
    },
    {
      speaker: "eric",
      line: " I'll file the jira for it.\n",
      item: "Jira item: ['eric'] - ['  The REST request made is wrong . \\n']"
    },
    {
      speaker: "justin",
      line: " I found a bug in our frontend, the button won't update\n",
      item: None
    },
    {
      speaker: "eric",
      line: " Let's file a jira for it\n",
      item: "Jira item: ['eric', 'justin'] - [\"button wo n't \\n update\"]"
    },
    {
      speaker: "harry",
      line:
        " While we are at it, can you create another jira ticket for the websocket issue\n",
      item: "Jira item: ['eric'] - ['for the websocket issue \\n']"
    },
    {
      speaker: "eric",
      line: " I'll put the create backup issue in jira also\n",
      item: "Jira item: [] - []"
    },
    {
      speaker: "eric",
      line: " Jeff could you file a jira issue for the bold text\n",
      item: "Jira item: ['jeff'] - ['for the bold text \\n']"
    },
    {
      speaker: "johnson",
      line: " Everything is broken\n",
      item: None
    },
    {
      speaker: "eric",
      line: " yeah okay I'll file the jira\n",
      item: "Jira item: ['eric'] - []"
    },
    {
      speaker: "wesley",
      line:
        " our backend is spitting out chinese characters, I'll create the jira for it.\n",
      item: "Jira item: ['backend'] - ['for the bold text \\n']"
    }
  ],
  tags: ["Jira", "Backend", "Architecture"]
};

const testDataString = JSON.stringify(testData);

class App extends React.Component {
  constructor(props) {
    super(props);
    const tagsToRender = this.handleTags(testDataString);
    const linesToRender = this.handleLines(testDataString);
    this.state = {
      transcript: linesToRender,
      tags: tagsToRender
    };
  }

  handleTags = data => {
    const result = JSON.parse(data);
    const tagList = result.tags.map((element, index) => {
      return Tag({ tag: element });
    });
    return tagList;
  };

  /**
   * Handles parsing of the lines from the model from the websocket
   * @param data - A JSON string with the model
   * @return <Array> - The Line components parsed out from the data
   */
  handleLines = data => {
    const result = JSON.parse(data);
    console.log(`result is ${JSON.stringify(result)}`);

    return result.transcript.map(element => {
      return <Line name={element.speaker} spoke={element.line} />;
    });
  };

  /**
   * Used as onMessage for the websocket.
   * @param data - A JSON string with the model
   */
  websocketOnMessage = data => {
    const linesToRender = this.handleLines(data);
    const tagsToRender = this.handleTags(data);
    this.setState({ transcript: linesToRender, tags: tagsToRender });
  };
  /*<Websocket url='ws://0.0.0.0:6677'
                onMessage={this.websocketOnMessage}/>*/
  render() {
    //  const { transcript, tags } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>Transcript</h1>
          <div>{this.state.transcript}</div>
          <h1>Tags</h1>
          <div>{this.state.tags}</div>
          {/* <Tag tag={"lol"} /> */}
        </header>
      </div>
    );
  }
}

export default App;
