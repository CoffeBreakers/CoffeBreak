// Include React
var React = require("react");

//importing from MaterialUI
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more'
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
//include the article modal
import ArticleModal from "./ArticleModal";

// Creating the Results component
// var ArticlesChildren = React.createClass({
  
export default class ArticlesChildren extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
          SelectedArticle: {}, 
          ModalOpen: false
        };
  }

//on tapping a grid, opens the modal containing article details. 
handleTouchTap(article)
{
  //console.log(JSON.stringify(article, null, 2));
  this.setState({SelectedArticle: article});
  this.setState({ModalOpen : true});
}

//on clicking close modal. 
closeModal()
{
  //console.log("signal received to close modal")
  this.setState({ModalOpen: false});
}

  // Here we describe this component's render method
  render() {
    
    return (
        <div style={styles.root}>
          <Paper style={paperStyles} zDepth={2}>
              <GridList
              cellHeight={250}
              cols={3}
              style={styles.gridList}
              >
              <Subheader>Your News Summaries</Subheader>
              {this.props.articles.map((article) => (
                  <GridTile
                  key={article.title}
                  title={<a href= {article.url} target="_blank">{article.title}</a>}
                  subtitle={<span>Category: <b>{article.category}</b>, Published on: <b>{article.date}</b></span>}
                  actionIcon={<IconButton><NavigationExpandMore color="white" /></IconButton>}
                  titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
                  onTouchTap={() => this.handleTouchTap(article)}
                  >
                  <img src={article.img} />
                  </GridTile>
              ))}
              </GridList>
              <ArticleModal closeModal= {() => this.closeModal()} article={this.state.SelectedArticle} open={this.state.ModalOpen}/>
            </Paper>
        </div>
    );
  }
};



//Styles
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 0,
  },
  gridList: {
    // width: 500,
    // height: 450,
    flexWrap: 'wrap',
    overflowY: 'auto',
  },
};

const paperStyles = {
  margin: 5,
  padding: 5,
  textAlign: 'center',
  display: 'inline-block',
};



//Old Render Function
// <div>
//     {this.props.articles.map(function(article, i){
//         return <div className="col-sm-4">
//                 <a href={article.url}><p>{article.title}</p></a>
//                 <p>Published on: {article.date}</p>
//                 <p>Category: {article.category}</p>
//                 </div>;
//     })}
// </div>