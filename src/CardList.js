import React from 'react';
import Card from './Card';

class CardList extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            cards: ["Buy Eggs from grocery", "Card 2", "Card 3"],
        }
        this.handleAddCard = this.handleAddCard.bind(this);
        this.moveRight = this.moveRight.bind(this);
        this.moveLeft = this.moveLeft.bind(this);


    }

    componentDidMount(){
        var cardListInLS = this.getDataFromLS(this.props.index);
        if(cardListInLS){
            this.setState({
                cards: cardListInLS
            });
        }
    }

    getDataFromLS(index){
        if(window.localStorage && window.localStorage.getItem("CardList#" + index)){
            return JSON.parse(window.localStorage.getItem("CardList#" + index));
        }
    }

    setDataToLS(index, data){
        if(window.localStorage){
            window.localStorage.setItem("CardList#" + index, JSON.stringify(data))
        }
    }

    componentWillReceiveProps(next, old){
       // debugger;
        if(next.movingItem !== null && next.movingItem !== old.movingItem){
            console.log(next.movingItem);
            let copyOfCards = [...this.state.cards];
            copyOfCards.push(next.movingItem);
            this.setState({
                cards: copyOfCards
            });
            this.setDataToLS(this.props.index, copyOfCards);
        }
    }
    handleAddCard(e){
        let cardText = window.prompt("Input card text");
        let copyOfCards = [...this.state.cards];
        copyOfCards.push(cardText);
        this.setState({
            cards: copyOfCards
        });
        this.setDataToLS(this.props.index, copyOfCards);
    }

    moveRight(index){
       // debugger;
        let copyOfCards = [...this.state.cards];
        let cards = copyOfCards.splice(index, 1);
        this.setState({
            cards: copyOfCards
        })
        this.setDataToLS(this.props.index, copyOfCards);
        this.props.moveCard(cards[0], this.props.index + 1);
    }
    moveLeft(index){
        let copyOfCards = [...this.state.cards];
        let cards = copyOfCards.splice(index, 1);
        this.setState({
            cards: copyOfCards
        });
        this.setDataToLS(this.props.index, copyOfCards);
        this.props.moveCard(cards[0], this.props.index - 1);
    }
    render(){
        return (

            <div className="column">
                <div className="cardlist-header" style={{background: this.props.color}}>{this.props.title}</div>
                <div>
                    {this.state.cards.map((card, i) => {                        
                        return <Card cardText={card} key={i} moveRight={this.moveRight} moveLeft={this.moveLeft} index={i} first={this.props.first} last={this.props.last}/>
                    })}


                </div>
                <div>
                    <span onClick={this.handleAddCard}
                    >+ Add a card</span>
                </div>
            </div>
        );
    }


}

export default CardList;