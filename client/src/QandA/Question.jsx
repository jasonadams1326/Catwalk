import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Modal from './Modal.jsx';
import AnswerSubmissionForm from './AnswerSubmissionForm.jsx';

class Question extends React.Component {
  constructor(props){
    super(props);
    this.state={
      questionBody: '',
      answersList: [],
      seeMoreAnswersClicked: false,
      modalShowing: false,
      helpfulClicked: false
      // answerHelpfulClicked: false
    };
    this.handleAnswerMarkedHelpful=this.handleAnswerMarkedHelpful.bind(this);
    this.handleAnswerReport=this.handleAnswerReport.bind(this);

    this.handleQuestionMarkedHelpful=this.handleQuestionMarkedHelpful.bind(this);
    this.handleQuestionReported=this.handleQuestionReported.bind(this);

    this.showModal=this.showModal.bind(this);
    this.hideModal=this.hideModal.bind(this);
  }

  showModal(){
    this.setState({modalShowing: true});
  }
  hideModal(){
    this.setState({modalShowing: false});
  }

  handleSeeMoreAnswersClick(){
    this.setState({
      seeMoreAnswersClicked: true
    });
  }

  handleSeeFewerAnswersClick(){
    this.setState({
      seeMoreAnswersClicked: false
    });
  }

  handleAnswerSubmission(answer, nickname, email){
    var data={
      body: answer,
      name: nickname,
      email: email,
      photos: []
    };
    axios.post(`/qa/questions/${currentQuestionID}/answers`, data)
    .then((response)=>{
     console.log('successful answer submission');
   })
   .catch((err)=>{
     console.log('error in handleAddAnswerClick: ', err);
   })
  }

  handleQuestionReported(question_id){
    console.log('question reported: ', question_id);
    axios.put(`/qa/questions/${question_id}/report`)
    .then((response)=>{
      console.log('successful axios.put req from handleQuestionReported');
    })
    .catch((err)=>{
      console.log('error in handleQuestionReported: ', err);
    })
  }

  handleQuestionMarkedHelpful(question_id){
    console.log('question marked as helpful: ', question_id);
    if(this.state.helpfulClicked===false){
      axios.put(`/qa/questions/${question_id}/helpful`)
      .then((response)=>{
        console.log('successful axios.put req from handleQuestionMarkedHelpful');
      })
      .catch((err)=>{
       console.log('error in handleQuestionMarkedHelpful: ', err);
      })
      this.setState({helpfulClicked: true});
    }
  }

  handleAnswerMarkedHelpful(answer_id){
    console.log('answer marked as helpful: ', answer_id);
      axios.put(`/qa/answers/${answer_id}/helpful`)
      .then((response)=>{
        console.log('successful axios.put req from handleAnswerMarkedHelpful');
      })
     .catch((err)=>{
        console.log('error in handleAnswerMarkedHelpful: ', err);
      })
  }

  handleAnswerReport(answer_id){
    console.log('answer reported: ', answer_id);
    axios.put(`/qa/answers/${answer_id}/report`)
    .then((response)=>{
      console.log('successful axios.put req from handleAnswerReport');
    })
    .catch((err)=>{
      console.log('error in handleAnswerReport: ', err);
    })
  }

  componentDidUpdate() {
    axios.get(`/qa/questions/${this.props.question.question_id}/answers`)
      .then((response)=>{
        this.setState({answersList: response.data.results.sort((a, b) => b.helpfulness - a.helpfulness)});
      })
      .catch((err)=>{
        console.log('error in Question componentDidMount: ', err);
      })
  }

  render(){
    if(this.state.answersList.length!==0){
    if(this.state.seeMoreAnswersClicked){
      return(
        <div className='question'>
          <span className="question-label">Q:</span>
          <span className='question-body'>{this.props.question.question_body}</span>
          <span className="question_options">
          <span className='question-helpful-rating'>Helpful?&nbsp;&nbsp;</span>
          <span className='question-helpful-btn' onClick={()=>this.handleQuestionMarkedHelpful(this.props.question.question_id)}>Yes ({this.props.question.question_helpfulness})</span>
          <span>&nbsp;&nbsp;</span>
          <span className="divider">|</span>
          <span>&nbsp;&nbsp;</span>
          <span className='question-report-btn' onClick={()=>this.handleQuestionReported(this.props.question.question_id)}>Report?</span>
          <span>&nbsp;&nbsp;</span>
          <span className="divider">|</span>
          <span>&nbsp;&nbsp;</span>
          <span className='add-answer-btn' onClick={this.showModal}>Add Answer</span>
          <Modal className='modal-answer-submission' isShowing={this.state.modalShowing} handleClose={this.hideModal}>
          <AnswerSubmissionForm handleAnswerSubmission={this.handleAnswerSubmission.bind(this)} />
          </Modal>
          </span>
          <span className='answer-list'>{this.state.answersList.map((answer, i)=>{
            return(
              <div className='answer' key={i}>
              <span className="answer-label">&nbsp;A:  </span>
              <span className='answer-body'>{answer.body}</span>
              <div className="answer-info-line">
              <div className='answer-info'>
              <span className='answer-username'>by {answer.answerer_name},&nbsp;{moment(answer.date, 'YYYYMMDD').fromNow()} </span>
              <span className='answer-helpful-btn' onClick={()=>this.handleAnswerMarkedHelpful(answer.answer_id)}>Helpful?</span>
              <span className='answer-report-btn' onClick={()=>this.handleAnswerReport(answer.answer_id)}>Report?</span>
              </div>
              </div>
              </div>
            );
          })}</span>
          <div className='more-answers-btn' onClick={this.handleSeeFewerAnswersClick.bind(this)}>COLLAPSE ANSWERS</div>

        </div>
      );
    } else {
      return(
        <div className='question'>
          <span className="question-label">Q:</span>
          <span className='question-body'>{this.props.question.question_body}</span>
          <span className="question_options">
          <span className='question-helpful-rating'>Helpful?&nbsp;&nbsp;</span>
          <span className='question-helpful-btn' onClick={()=>this.handleQuestionMarkedHelpful(this.props.question.question_id)}>Yes ({this.props.question.question_helpfulness})</span>
          <span className="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span className='question-report-btn' onClick={()=>this.handleQuestionReported(this.props.question.question_id)}>Report?</span>
          <span className="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
          <span className='add-answer-btn' onClick={this.showModal}>Add Answer</span>
          <Modal className='modal-answer-submission' isShowing={this.state.modalShowing} handleClose={this.hideModal}>
          <AnswerSubmissionForm handleAnswerSubmission={this.handleAnswerSubmission.bind(this)} />
          </Modal>
          </span>
          <span className='answer-list'>{this.state.answersList.slice(0, 2).map((answer, i)=>{
            return(
              <div className='answer' key={i}>
              <span className="answer-label">&nbsp;A:  </span>
              <span className='answer-body'>{answer.body}</span>
              <div className="answer-info-line">
              <div className='answer-info'>
              <span className='answer-username'>by {answer.answerer_name},&nbsp;{moment(answer.date, 'YYYYMMDD').fromNow()} </span>
              <span className="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span className='answer-helpful-btn' onClick={()=>this.handleAnswerMarkedHelpful(answer.answer_id)}>Helpful?</span>
              <span className="divider">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
              <span className='answer-report-btn' onClick={()=>this.handleAnswerReport(answer.answer_id)}>Report?</span>
              </div>
              </div>

              <div className='answer-photos-container'>{answer.photos.map((photo, i)=>{
                return (
                 <span className='answer-photo-span' key={i}>
                   <img className='answer-photo-img' src={photo.url}/>
                 </span>
                );

              })}</div>


              </div>
            );
          })}</span>
          <div className='more-answers-btn' onClick={this.handleSeeMoreAnswersClick.bind(this)}>LOAD MORE ANSWERS</div>
        </div>
      );
    }
  } else {
    return(
      <div className='question-without-answers'>
        <span className="question-label">Q:</span>
          <span className='question-body'>{this.props.question.question_body}</span>
        <div className='no-answers-currently'>There are currently no answers for this question.</div>
        <span className="question_options">
        <span className='question-helpful-rating'>Helpful?&nbsp;&nbsp;</span>
        <span className='question-helpful-btn' onClick={()=>this.handleQuestionMarkedHelpful(this.props.question.question_id)}>Yes ({this.props.question.question_helpfulness})</span>
        <span>&nbsp;&nbsp;</span>
          <span className="divider">|</span>
          <span>&nbsp;&nbsp;</span>
        <span className='question-report-btn' onClick={()=>this.handleQuestionReported(this.props.question.question_id)}>Report?</span>
        <span>&nbsp;&nbsp;</span>
          <span className="divider">|</span>
          <span>&nbsp;&nbsp;</span>
        <span className='add-answer-btn' onClick={this.showModal}>Add Answer</span>
        <Modal className='modal-answer-submission' isShowing={this.state.modalShowing} handleClose={this.hideModal}>
        <AnswerSubmissionForm handleAnswerSubmission={this.handleAnswerSubmission.bind(this)} />
        </Modal>
        </span>
      </div>);
  }

  }
}

export default Question;