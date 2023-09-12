import React from 'react';
import { mount } from 'enzyme'; // Utilisation de Enzyme pour le rendu du composant
import { expect } from 'chai';
import sinon from 'sinon';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

import AdminNewHotel from '../src/pages/admin/AdminNewHotel';

// Création d'une fonction de stub pour axios.post
const axiosPostStub = sinon.stub(axios, 'post');

describe('AdminNewHotel', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(<AdminNewHotel />);
    });

    afterEach(() => {
        axiosPostStub.reset(); // Réinitialise le stub après chaque test
    });

    it('renders without crashing', () => {
        expect(wrapper.exists()).to.be.true;
    });

    it('handles form submission correctly', async () => {
        const mockResponse = { data: { url: 'mocked_image_url' } };
        axiosPostStub.resolves(mockResponse);

        // Simuler la sélection de fichiers dans le champ de fichier
        const files = [new File([''], 'mock_image.png', { type: 'image/png' })];
        await act(async () => {
            wrapper.find('input[type="file"]').simulate('change', { target: { files } });
        });

        // Simuler le remplissage des champs et la sélection d'options
        wrapper.find('#someInputId').simulate('change', { target: { id: 'someInputId', value: 'someValue' } });
        wrapper.find('#rooms').simulate('change', { target: { selectedOptions: [{ value: 'room1' }, { value: 'room2' }] } });

        // Simuler le clic sur le bouton
        await act(async () => {
            wrapper.find('button').simulate('click');
        });

        // Vérifier si axios.post a été appelé avec les bonnes données
        expect(axiosPostStub).to.have.been.calledWith('/hotels', {
            // Les données attendues pour la requête POST
            info: { someInputId: 'someValue' },
            rooms: ['room1', 'room2'],
            photos: ['mocked_image_url'],
        });

        // Vérifier si la navigation a été déclenchée
        expect(wrapper.find('RouterMock').props().navigate).to.have.been.calledWith('/admin/hotels');
    });

    // Vous pouvez ajouter plus de tests ici pour couvrir d'autres scénarios
});
