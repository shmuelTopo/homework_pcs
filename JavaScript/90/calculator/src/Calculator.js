import React, { Component } from 'react'
import fromExponential from 'from-exponential';
import calculatorStuff from './calculatorStuff';
import './Calculator.css';

export default class calculator extends Component {
    constructor(props) {
        super(props);
        this.maxCharacters = 10;
        
        this.state = {
            current: '0',
            previous: 0,
            operator: null,
            lastClicked: null,
            previousRHS: null, // Left hand side of the equation
        }
    }

    handleClicks = (buttonIndex) => {
        const {value, type} = calculatorStuff.buttons[buttonIndex];
        
        switch(type) {
            case 'number':
                this.handleNumbers(value);
                break;
            case 'dot':
                this.handleDot();
                break;
            case 'operator':
                this.handleOperator(value);
                break;
            case 'equal':
                this.calculate();
                break;
            case 'clear':
                this.resetCalculator();
                break;
            case 'plusMinus':
                this.setState({
                    current: String(Number(this.state.current) * -1)
                })
                break;
            case 'percent':
                this.setState({
                    current: String(Number(this.state.current) / 100)
                })
                break;
            default:
                break;
        }

        this.setState({
            lastClicked: type
        })
    }

    handleNumbers = (value) => {
        switch(this.state.lastClicked) {
            case 'equal':
                this.resetCalculator();
                break;
            case 'operator':
                break;
            default:
                if (this.state.current === '0') break;

                if(this.state.current.length < this.maxCharacters) {
                    this.setState({
                        current: `${this.state.current}${value}`
                    });
                } else {
                    console.log('To many characters');
                }
                return;
        }
        this.setState({
            current: String(value)
        });
    }

    handleDot = () => {
        if(this.state.lastClicked === 'equal') {
            this.resetCalculator();
            this.setState({
                current: '0.'
            });
        } else {
            if(String(this.state.current).includes('.')) {
                return;
            } else {
                this.setState ({
                    current: `${this.state.current}.`
                })
            }
        }
    }

    handleOperator = (operator) => {
        // If operator was clicked last time, don't do anything, 
        // but if the operator was not clicked last time
        if(this.state.lastClicked !== 'operator'){                
            // If there is a previous number, preform a calculation and store the solution
            if(this.state.previous){
                this.setState({
                    previous: this.calculate()
                })
            // If there is no previous number
            } else {
                this.setState({
                    previous: this.state.current,
                    current: ''
                });
            }
        } 

        // Set the operator (no matter what was clicked last time)
        this.setState({
            operator: operator
        })
    }


    calculate = () => { 
        // Left part of the equation
        let LHS = Number(this.state.previous);
        // Right part of the equation
        let RHS = fromExponential(this.state.current);

        // if the equal was clicked twice in a raw
        if(this.state.lastClicked === 'equal') {
            LHS = RHS;
            RHS = this.state.previousRHS;
        }

        const solution = calculatorStuff.getSolution(`${LHS} ${this.state.operator} ${RHS}`);

        this.setState({
            previousRHS: RHS,
            previous: 0,
            current: String(solution)
        })

        return solution;
    }

    resetCalculator() {
        this.setState({
            current: '0',
            previous: 0,
            operator: null,
            lastClicked: null,
        })
    }

    render() {
        return (
            <div className='calculator'>
                <div className='calculator-display'>{calculatorStuff.getNumberToShowCalc(this.state.current)}</div>
                {calculatorStuff.buttons.map((item, index) => {
                    return (
                        <button key={item.value} onClick={() => this.handleClicks(index)} className={item.styleClass}>
                            {item.show || item.value}
                        </button>
                    )
                })}   
            </div>
        )
    }
}
