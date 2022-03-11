import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Counter from './Counter'

describe('Counter Component', ()=>{
    test('Title must start with value 0', ()=>{

        render(<Counter/>);

        const counterTitle = screen.getByText("0");
        // const counterTitle = screen.queryByText("0");  // Retorna nulo caso não tenha
        // const counterTitle = screen.findByText("0");  // Retorna uma Promise (Não é apressado)

        expect(counterTitle).toBeInTheDocument();
    })

    test('Must contain a counter__title class in the title', ()=>{

        render(<Counter/>);

        const counterTitle = screen.getByText("0");
        
        expect(counterTitle).toHaveClass('counter__title');
    })

    test('Should not start titles with classes counter__title--increment and counter__title--decrement', ()=>{

        render(<Counter/>);

        const counterTitle = screen.queryByText("0");
        
        expect(counterTitle).not.toHaveClass('counter__title--increment');
        expect(counterTitle).not.toHaveClass('counter__title--decrement');
    })

    test('It must start with the Increment and Decrement buttons with classes button and button--increment/button--decrement', ()=>{

        render(<Counter/>);

        const buttonDecrement = screen.getByRole("button",{name:'decrementar'});
        const buttonIncrement = screen.getByRole("button",{name:'incrementar'});
        
        expect(buttonDecrement).toBeInTheDocument();
        expect(buttonDecrement).toHaveClass('button');
        expect(buttonDecrement).toHaveClass('button--decrement');
        
        expect(buttonIncrement).toBeInTheDocument();
        expect(buttonIncrement).toHaveClass('button');
        expect(buttonIncrement).toHaveClass('button--increment');
    })

    test('When clicking increment change to 1', ()=>{

        render(<Counter/>);

        const buttonIncrement = screen.getByRole("button",{name:'incrementar'});

        expect(screen.queryByText("1")).toBeNull();
        userEvent.click(buttonIncrement);
        expect(screen.queryByText("1")).toBeInTheDocument();
    })

    test('When clicking decrement change to -1', ()=>{

        render(<Counter/>);

        const buttonDecrement = screen.getByRole("button",{name:'decrementar'});

        expect(screen.queryByText("-1")).toBeNull();
        userEvent.click(buttonDecrement);
        expect(screen.queryByText("-1")).toBeInTheDocument();
    })

    test('Must add a counter__title--increment class when the value is greater than 0', ()=>{

        render(<Counter/>);

        const counterTitle = screen.queryByText("0");
        const buttonIncrement = screen.getByRole("button",{name:'incrementar'});

        expect(counterTitle).not.toHaveClass('counter__title--increment');
        userEvent.click(buttonIncrement);
        expect(counterTitle).toHaveClass('counter__title--increment');
        
    })

    test('Must add a counter__title--decrement class when the value is smaller than 0', ()=>{

        render(<Counter/>);

        const counterTitle = screen.queryByText("0");
        const buttonDecrement = screen.getByRole("button",{name:'decrementar'});

        expect(counterTitle).not.toHaveClass('counter__title--decrement');
        userEvent.click(buttonDecrement);
        expect(counterTitle).toHaveClass('counter__title--decrement');
    })
})