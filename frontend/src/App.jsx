import React from "react";
import Websocket from "react-websocket";
import "./App.css";
import Tag from "./Components/Tag";
import Line from "./Components/Line";

const None = null;

const testData = {
  transcript: [
    {
      speaker: "eric",
      line: " Let's file a jira for it\n",
      item: {
        what: "Button wo n't \n update",
        who: "Justin Eric"
      }
    },
    {
      speaker: "harry",
      line:
        " While we are at it, can you create another jira ticket for the websocket issue\n",
      item: {
        what: "For the websocket issue",
        who: "Eric"
      }
    },
    {
      speaker: "eric",
      line: " I'll put the create backup issue in jira also\n",
      item: {
        what: "",
        who: ""
      }
    },
    {
      speaker: "eric",
      line: " Jeff could you file a jira issue for the bold text\n",
      item: {
        what: "For the bold text",
        who: "Jeff"
      }
    },
    {
      speaker: "johnson",
      line: " Everything is broken\n",
      item: None
    },
    {
      speaker: "eric",
      line: " yeah okay I'll file the jira\n",
      item: {
        what: "",
        who: "Eric"
      }
    },
    {
      speaker: "wesley",
      line:
        " our backend is spitting out chinese characters, I'll create the jira for it.\n",
      item: {
        what: "For the bold text",
        who: "Backend"
      }
    },
    {
      speaker: "mark",
      line: " I want to make a Jira ticket for this broken button",
      item: {
        what: "For this broken button",
        who: "Mark"
      }
    },
    {
      speaker: "justin",
      line: " The REST request made is wrong.\n",
      item: None
    },
    {
      speaker: "eric",
      line: " I'll file the jira for it.\n",
      item: {
        what: "The rest request made is wrong .",
        who: "Eric"
      }
    },
    {
      speaker: "justin",
      line: " I found a bug in our frontend, the button won't update\n",
      item: None
    },
    {
      speaker: "eric",
      line: " Let's file a jira for it\n",
      item: {
        what: "Button wo n't \n update",
        who: "Eric Justin"
      }
    },
    {
      speaker: "harry",
      line:
        " While we are at it, can you create another jira ticket for the websocket issue\n",
      item: {
        what: "For the websocket issue",
        who: "Eric"
      }
    },
    {
      speaker: "eric",
      line: " I'll put the create backup issue in jira also\n",
      item: {
        what: "",
        who: ""
      }
    },
    {
      speaker: "eric",
      line: " Jeff could you file a jira issue for the bold text\n",
      item: {
        what: "For the bold text",
        who: "Jeff"
      }
    },
    {
      speaker: "johnson",
      line: " Everything is broken\n",
      item: None
    },
    {
      speaker: "eric",
      line: " yeah okay I'll file the jira\n",
      item: {
        what: "",
        who: "Eric"
      }
    },
    {
      speaker: "wesley",
      line:
        " our backend is spitting out chinese characters, I'll create the jira for it.\n",
      item: {
        what: "For the bold text",
        who: "Backend"
      }
    },
    {
      speaker: "mark",
      line: " I want to make a Jira ticket for this broken button",
      item: {
        what: "For this broken button",
        who: "Mark"
      }
    },
    {
      speaker: "justin",
      line: " The REST request made is wrong.\n",
      item: None
    },
    {
      speaker: "eric",
      line: " I'll file the jira for it.\n",
      item: {
        what: "The rest request made is wrong .",
        who: "Eric"
      }
    },
    {
      speaker: "justin",
      line: " I found a bug in our frontend, the button won't update\n",
      item: None
    },
    {
      speaker: "eric",
      line: " Let's file a jira for it\n",
      item: {
        what: "Button wo n't \n update",
        who: "Justin Eric"
      }
    }
  ],
  tags: [
    "jira issue",
    "jira ticket",
    "websocket issue",
    "backup issue",
    "broken button",
    "chinese characters",
    "bold text",
    "REST request",
    "backend",
    "bug",
    "frontend",
    "Jeff"
  ]
};

const testDataString = JSON.stringify(testData);
// const ws = (
//   <Websocket url="ws://0.0.0.0:6677" onMessage={this.websocketOnMessage} />
// );

class App extends React.Component {
  constructor(props) {
    super(props);
    const lines = this.handleLines(testDataString)
    const tags = this.handleTags(testDataString)
    this.state = {
      transcript: lines,
      tags: tags
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

    return result.transcript.map(element => 
      (element.item ? <Line
          name={element.speaker}
          spoke={element.line}
          what={element.item.what}
          who={element.item.who}
        /> : 
        <Line
          name={element.speaker}
          spoke={element.line}
        />)
    );
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
      <div className="App" style={container}>
        <div style={lineContainer}>
          <h1>Transcript</h1>
          <div>{this.state.transcript}</div>
        </div>

        <div style={tagContainer}>
          <h1>Tags</h1>
          <div>{this.state.tags}</div>
        </div>
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => {
            this.messagesEnd = el;
          }}
        />
        {/* <Tag tag={"lol"} /> */}

        <Websocket
          url="ws://0.0.0.0:6677"
          onMessage={this.websocketOnMessage}
        />
      </div>
    );
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  };
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
}
const container = {
  "flexDirection": "row",
  "display": "flex",
  "justify-content": "center",
  "align-items": "baseline",
  "align-content": "center"
};
const lineContainer = { "flexGrow": 3 };
const tagContainer = { "flexGrow": 1, "alignSelf": "flex-start" };
export default App;
