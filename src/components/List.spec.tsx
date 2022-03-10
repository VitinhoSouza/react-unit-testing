import {render, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './List'

describe('List Component', ()=>{
    it('should render list items', ()=>{
        const {getByText, rerender, unmount,queryByText} = render(<List initialItems={['Victor','Edu','João']}/>)

        expect(getByText('Victor')).toBeInTheDocument()
        expect(getByText('Edu')).toBeInTheDocument()
        expect(getByText('João')).toBeInTheDocument()

        unmount()
        rerender(<List initialItems={['Paula']}/>)
        expect(getByText('Paula')).toBeInTheDocument()
        expect(queryByText('Edu')).not.toBeInTheDocument()
    });

    it('should be ble to add new item to the list', async ()=>{
        const {getByText, getByPlaceholderText, findByText} = render(<List initialItems={[]}/>)

        const inputElement = getByPlaceholderText('Novo item');
        const addButon = getByText('Adicionar');
        
        userEvent.type(inputElement, 'Novo');
        userEvent.click(addButon);
        
        expect(await findByText('Novo')).toBeInTheDocument()
        /* await waitFor(() => {
            expect(getByText('Novo')).toBeInTheDocument()
        }) */

        // debug()
    });

    it('should be ble to remove item from the list', async ()=>{
        const {getAllByText,queryByText} = render(<List initialItems={['Victor','Edu','João']}/>)

        const removeButtons = getAllByText('Remover');

        userEvent.click(removeButtons[0]);
        
        /* await waitForElementToBeRemoved(() => {
            return getByText('Victor')
        }) */

        await waitFor(() => {
            expect(queryByText('Victor')).not.toBeInTheDocument()
        })
       
    });
});