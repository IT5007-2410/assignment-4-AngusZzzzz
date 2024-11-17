import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { Picker } from '@react-native-picker/picker';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
    TouchableOpacity,
    Alert,
  } from 'react-native';

const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
}

async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
      const body = await response.text();
      const result = JSON.parse(body, jsonDateReviver);
  
      if (result.errors) {
        const error = result.errors[0];
        if (error.extensions.code == 'BAD_USER_INPUT') {
          const details = error.extensions.exception.errors.join('\n ');
          alert(`${error.message}:\n ${details}`);
        } else {
          alert(`${error.extensions.code}: ${error.message}`);
        }
      }
      return result.data;
    } catch (e) {
      alert(`Error in sending data to server: ${e.message}`);
    }
  }

class IssueFilter extends React.Component {
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
        <Text style={{
          paddingTop: 50, 
          textAlign: 'center',  
          color: '#0033A0', 
          fontSize: 25, 
          fontWeight: 'bold' 
        }}>
          Nothing Here
        </Text>
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  
  header: { 
    height: 50, 
    backgroundColor: '#537791' 
  },
  
  dataWrapper: { 
    marginTop: -1 
  },
  
  row: { 
    height: 40, 
    backgroundColor: '#E7E6E1' 
  },
  
  headline: { 
    textAlign: 'center', 
    padding: 10, 
    paddingTop: 20, 
    color: '#0033A0', 
    fontSize: 25, 
    fontWeight: 'bold' 
  },

  navigation: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center',
    backgroundColor: '#4A4A4A',
    paddingVertical: 10,
  },
  
  scroll: { 
    flexDirection: 'row', 
    alignContent: 'center', 
    width: '100%' 
  },
  
  table: { 
    textAlign: 'center', 
    flexDirection: 'row', 
    justifyContent: 'space-around',  
  },
  
  cell: { 
    borderWidth: 1, 
    borderColor: 'black', 
    paddingTop: 5, 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    textAlign: 'center', 
    color: '#000000' 
  },
  
  form: { 
    flexDirection: 'column', 
    alignItems: 'center',
    marginBottom: 10 
  },

  tag: { 
    color: '#000', 
    fontWeight: 'bold',
    fontSize: 20, 
    marginBottom: 5,
  },
  
  inputbox: { 
    height: 40, 
    width: 230, 
    borderColor: '#4A4A4A', 
    borderWidth: 1, 
    borderRadius: 5,  
    marginBottom: 10,
  },

  pickerContainer: {
    height: 40, 
    width: 230, 
    marginBottom: 20, 
    justifyContent: 'center',
  },

  picker: {
    paddingLeft: 8,
    color: 'black',
    backgroundColor: 'white',
  },

});


const width= [40,80,80,80,80,80,200];

/*
function IssueRow(props) {
  const issue = props.issue;
  return (
    <tr>
      <td>{issue.id}</td>
      <td>{issue.status}</td>
      <td>{issue.owner}</td>
      <td>{issue.created.toDateString()}</td>
      <td>{issue.effort}</td>
      <td>{issue.due ? issue.due.toDateString() : ''}</td>
      <td>{issue.title}</td>
    </tr>
  );
}
*/

function IssueRow(props) {
    const issue = props.issue;
    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
    const row = [
      issue.id,
      issue.status,
      issue.owner,
      issue.created.toLocaleDateString('en-CA'),
      issue.effort,
      issue.due ? new Date(issue.due).toLocaleDateString('en-CA') : '',
      issue.title,
    ];
    {/****** Q2: Coding Ends here.******/}
    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
      <View style={styles.table}>
        {row.map((data, index) => (
          <Text key={`row-${issue.id}-${index}`} style={[styles.cell, { width: width[index] }]}>
            {data}
          </Text>
        ))}
      </View>
      {/****** Q2: Coding Ends here. ******/} 
      </>
    );
}
  
function IssueTable(props) {
    const issueRows = props.issues.map(issue =>
      <IssueRow key={issue.id} issue={issue} />
    );

    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const header = [
        'ID',
        'Status',
        'Owner',
        'Created',
        'Effort',
        'Due Date',
        'Title',
    ];
    {/****** Q2: Coding Ends here. ******/}
    
    return (
      <>
        {/****** Q2: Start Coding here to render the table header/rows.**********/}
        <Text style={styles.headline}>Issue Table</Text>
        <View style={styles.container}>
          <ScrollView horizontal style={styles.scroll}>
            <View>
              <View style={styles.table}>
                {header.map((headline, index) => (
                  <Text key={`header-${index}`} style={[styles.cell, { width: width[index] }]}>
                    {headline}
                  </Text>
                ))}
              </View>
              {issueRows}
            </View>
          </ScrollView>
        </View>
        {/****** Q2: Coding Ends here. ******/}
      </>
    );
    
}
  
class IssueAdd extends React.Component {
    constructor() {
      super();
      this.state = {
        status: 'New',
        owner: null,
        effort: null,
        due: '',
        title: '',
        isValidDate: true,
      };
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      /****** Q3: Code Ends here. ******/
    }
    
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleInputChange = (field, value) => {
      if (field === 'due') {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        const isValidDate = dateRegex.test(value);
        this.setState({ due: value, isValidDate });
      } else {
        this.setState({ [field]: value });
      }
    };
    /****** Q3: Code Ends here. ******/

    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
        const { status, owner, effort, due, title, isValidDate } = this.state;

        if (!isValidDate || due === '') {
          Alert.alert('Invalid Date', 'Please enter a valid date in YYYY-MM-DD format.');
          return;
        }

        const newIssue = {
          status: status,
          owner: owner || 'New',
          effort: effort ? parseInt(effort, 10) : null,
          due: due,
          title: title,
        };

        this.props.createIssue(newIssue);

        this.setState({
          status: 'New',
          owner: null,
          effort: null,
          due: '',
          title: '',
          isValidDate: true,
        });

        Alert.alert("Added Successfully");
      /****** Q3: Code Ends here. ******/
    }

    /****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/
    renderFormField(label, field, keyboardType = 'default') {
      return (
        <View style={styles.form}>
          <Text style={styles.tag}>{label}</Text>
          <TextInput
            style={styles.inputbox}
            keyboardType={keyboardType}
            value={this.state[field]}
            onChangeText={(text) => this.handleInputChange(field, text)}
          />
        </View>
      );
    }

    render() {

      return (
        <View style={styles.container}>
          <Text style={styles.headline}>New Issue</Text>

          <View style={styles.form}>
            <Text style={styles.tag}>Due Date</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: this.state.isValidDate ? 'gray' : 'red' },
              ]}
              value={this.state.due}
              onChangeText={(text) => this.handleInputChange('due', text)}
              placeholder="YYYY-MM-DD"
            />
            {!this.state.isValidDate && (
              <Text style={{ color: 'red', marginTop: 5 }}>
                Invalid date format. Please use YYYY-MM-DD.
              </Text>
            )}
          </View>

          {this.renderFormField('Owner', 'owner')}
          {this.renderFormField('Effort', 'effort', 'numeric')}
          {this.renderFormField('Title', 'title')}

          <View style={styles.form}>
            <Text style={styles.tag}>Status</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={this.state.status}
                onValueChange={(itemValue) => this.handleInputChange('status', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="New" value="New" />
                <Picker.Item label="Assigned" value="Assigned" />
                <Picker.Item label="Fixed" value="Fixed" />
              </Picker>
            </View>
          </View>
          
          <Button title="Submit" onPress={this.handleSubmit} color='#0033A0' />
        </View>
        /****** Q3: Code Ends here. ******/
      );
    }
}

class BlackList extends React.Component {
    constructor()
    {   super();
        this.handleSubmit = this.handleSubmit.bind(this);
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = { owner: '' };
        this.handleChange = this.handleChange.bind(this);
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleChange(value) {
        this.setState({ owner: value });
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
        /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
        const owner = this.state.owner;
        const query = `mutation addToBlacklist($name: String!) {
          addToBlacklist(nameInput: $name)
        }`;

        /*
        try {
          const data = await graphQLFetch(query, { owner });
          if (data) {
            this.setState({ owner: '' });
            Alert.alert('Added Successfully');
          }
        } catch (error) {
          Alert.alert('Error adding to blacklist', error.message);
        }
        */

        const data = await graphQLFetch(query, { owner });
        this.setState({ owner: '' });
        Alert.alert("Added Successfully");
        /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
      <View style={styles.container}>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
        <Text style={styles.headline}>BlackList</Text>
        <View style={styles.form}>
            <Text style={styles.tag}>Owner</Text>
            <TextInput
              style={styles.inputbox}
              value={this.state.owner}
              onChangeText={(text) => this.handleChange(text)}
            />
        </View>
        <Button title="Submit" onPress={this.handleSubmit} color='#0033A0' />
        {/****** Q4: Code Ends here. ******/}
      </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [], selector: 1 };
        this.createIssue = this.createIssue.bind(this);
        this.addToBlacklist = this.addToBlacklist.bind(this);
    }
    
    componentDidMount() {
        this.loadData();
    }

    async loadData() {
        const query = `query {
            issueList {
            id title status owner
            created effort due
            }
        }`;

        const data = await graphQLFetch(query);

        if (data) {
            this.setState({ issues: data.issueList });
        }
    }

    async createIssue(issue) {
        const query = `mutation issueAdd($issue: IssueInputs!) {
            issueAdd(issue: $issue) {
            id
            }
        }`;

        const data = await graphQLFetch(query, { issue });

        if (data) {
            this.loadData();
        }
    }

    async addToBlacklist(nameInput) {
        const query = `mutation addToBlacklist($nameInput: nameInput!) {
            addToBlacklist(nameInput: $nameInput) {
                result
            }
        }`;

        const data = await graphQLFetch(query, { nameInput });
    }
    
    setSelector(value) {
        this.setState({ selector: value });
    }

    render() {
      return (
      <>
      {/****** Q1: Start Coding here. ******/}
      {/****** Q1: Code ends here ******/}


      {/****** Q2: Start Coding here. ******/}
      {/****** Q2: Code ends here ******/}

      
      {/****** Q3: Start Coding here. ******/}
      {/****** Q3: Code Ends here. ******/}

      {/****** Q4: Start Coding here. ******/}
      {/****** Q4: Code Ends here. ******/}
        <View style={styles.navigation}>
          <Button title="Issue Filter" onPress={() => this.setSelector(1)} color="#4A4A4A">
            IssueFilter
          </Button>
          <Button title="Display" onPress={() => this.setSelector(2)} color="#4A4A4A">
            IssueTable
          </Button>
          <Button title="Add" onPress={() => this.setSelector(3)} color="#4A4A4A">
            IssueAdd
          </Button>
          <Button title="BlackList" onPress={() => this.setSelector(4)} color="#4A4A4A">
            BlackList
          </Button>
        </View>

      {this.state.selector === 1 && <IssueFilter/>}
      {this.state.selector === 2 && <IssueTable issues={this.state.issues}/>}
      {this.state.selector === 3 && <IssueAdd createIssue={this.createIssue}/>}
      {this.state.selector === 4 && <BlackList addToBlacklist={this.addToBlacklist}/>}
      </>
    );
  }
}
