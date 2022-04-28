import React from 'react';

class QuestionSubmissionForm extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      question: '',
      nickname: '',
      email: ''
    };
    this.handleQuestionChange = this.handleQuestionChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNicknameChange=this.handleNicknameChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
  }

  handleQuestionChange(event){
    this.setState({question: event.target.value});
  }

  handleNicknameChange(event){
    this.setState({nickname: event.target.value});
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleQuestionSubmission(this.state.question, this.state.nickname, this.state.email);
  }

  render(){
    return(
      <div className='question-submission-form'>
        <form onSubmit={this.handleSubmit}>
          <input className='question-submission-body' placeholder="Ask question here" value={this.state.question} onChange={this.handleQuestionChange}>
          </input>
          <input className='question-submission-username' placeholder="Nickname" value={this.state.nickname} onChange={this.handleNicknameChange}>
          </input>
          <div className='question-submission-username-disclaimer'>For privacy reasons, do not use your full name or email address as a nickname.</div>
          <input className='question-submission-email' placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}>
          </input>
          <div className='question-submission-email-disclaimer'> For authentication reasons, you will not be emailed. </div>
          <input className='question-submission-submit' type='submit' value='Submit'/>
        </form>
      </div>
     );
  }
}

export default QuestionSubmissionForm;