import React from 'react';
import './App.css';
import CardList from './CardList';
class App extends React.Component {
  constructor(props){
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.initialState = [
        {title: "Winnie", color: "#8E6E95", movingItem: null },
        {title: "Bob", color: "lightblue", movingItem: null },
        {title: "Thomas", color: "lightgreen" , movingItem: null},
        {title: "George", color: "brown", movingItem: null }
    ];
    this.state = {
      cardListContainer: this.initialState
    }
  }

  componentWillMount(){
    console.log('componentWillMount');
     
  }

  componentDidMount(){
    console.log('componentDidMount');

  }

  moveCard(card, index){
    let tempList = [...this.state.cardListContainer];
    tempList.forEach(temp => temp.movingItem = null);
    console.log(tempList);
    tempList[index].movingItem = card;
    this.setState({ cardListContainer: tempList});
  }
  render(){
      console.log('Render called');
      return (
      <div className="App">
        <header className="App-header">
          <div>
           { this.state.cardListContainer.map((cardlist, i) =>{
             return <CardList title={cardlist.title} color={cardlist.color} key={i} index={i} moveCard = {this.moveCard} movingItem={cardlist.movingItem} first={i === 0} last={i===3}/>
           })}
          </div>
        </header>
      </div>
    );
  }

}

export default App;
