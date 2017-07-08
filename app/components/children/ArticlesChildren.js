// Include React
var React = require("react");

//importing from MaterialUI
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

// Creating the Results component
var Results = React.createClass({

  // Here we describe this component's render method
  render: function() {
    return (
        <div style={styles.root}>
            <GridList
            cellHeight={300}
            cols={3}
            style={styles.gridList}
            >
            <Subheader>Your News Summaries</Subheader>
            {this.props.articles.map((article) => (
                <GridTile
                key={article.title}
                title={<a href= {article.url}>{article.title}</a>}
                subtitle={<span>Category: <b>{article.category}</b>, Published on: <b>{article.date}</b></span>}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                >
                <img src={article.img} />
                </GridTile>
            ))}
            </GridList>
        </div>
    );
  }
});

//Styles
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    // width: 500,
    // height: 450,
    flexWrap: 'wrap',
    overflowY: 'auto',
  },
};

// Export the component back for use in other files
module.exports = Results;


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