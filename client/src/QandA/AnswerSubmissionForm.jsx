import React from 'react';

class AnswerSubmissionForm extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      answer: '',
      nickname: '',
      email: ''
    };
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNicknameChange=this.handleNicknameChange.bind(this);
    this.handleEmailChange=this.handleEmailChange.bind(this);
  }

  handleAnswerChange(event){
    this.setState({answer: event.target.value});
  }

  handleNicknameChange(event){
    this.setState({nickname: event.target.value});
  }

  handleEmailChange(event){
    this.setState({email: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.handleAnswerSubmission(this.state.answer, this.state.nickname, this.state.email);
  }

  render(){
    return(
      <div className='answer-submission-form'>
        <form onSubmit={this.handleSubmit}>
          <input className='answer-submission-body' placeholder="Enter answer here" value={this.state.answer} onChange={this.handleAnswerChange}>
          </input>
          <input className='answer-submission-username' placeholder="Nickname" value={this.state.nickname} onChange={this.handleNicknameChange}>
          </input>
          <div className='answer-submission-username-disclaimer'>For privacy reasons, do not use your full name or email address.</div>
          <input className='answer-submission-email' placeholder="Email" value={this.state.email} onChange={this.handleEmailChange}>
          </input>
          <div className='answer-submission-email-disclaimer'> For authentication reasons, you will not be emailed.</div>
          <input className='answer-submission-submit' type='submit' value='Submit Answer'/>
        </form>
      </div>
     );
  }
}

export default AnswerSubmissionForm;