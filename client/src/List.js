import { useState } from 'react';
import Card from './Card';

function List(props) {
    const [listTitle, setListTitle] = useState("");

    // Fait apparaître la modale lors du clic sur le boutton + de la liste
    function showCardModal() {
        const cardModal = document.getElementById("addCardModal");

        // Ajoute l'id de la liste en dataset pour pouvoir le récupérer avec les cartes
        cardModal.dataset.listId = props.id;
        cardModal.classList.add("is-active");
    }
    
    // Affiche la modal d'edition de nom de la liste
    function handleEditListModal(event) {
        event.target.classList.add('is-hidden');
        const form = event.target.nextSibling;
        
        form.classList.remove('is-hidden');
    }

    // Ferme la modal d'edition de liste
    function closeEditListModal(event) {
        const form = event.target.closest('form');
        const title = form.previousSibling;

        form.classList.add('is-hidden');
        title.classList.remove('is-hidden');
    }

    // Garde en mémoire dans la variable listTitle le changement de titre de la liste
    function handleListTitle(event) {
        const value = event.target.value;
        setListTitle(value);
    }

    return (
        <div className="column is-one-quarter panel">
            <div className="panel-heading has-background-info">
                <div className="columns">

                    <div className="column">
                        <h2 onDoubleClick={handleEditListModal} className="has-text-white">{props.title}</h2>

                        <form action="" method="POST" className="is-hidden">
                            <div className="field has-addons">
                                <div className="control">
                                    <input autoComplete='off' onChange={handleListTitle} type="text" className="input is-small" name="list-name" value={listTitle}
                                        placeholder="Nom de la liste" />
                                </div>
                                <div className="control">
                                    <button
                                    onClick={(event) => {
                                        event.preventDefault();
                                        closeEditListModal(event);
                                        props.handleEditListTitle(listTitle, props.id)
                                    }}
                                    className="button is-small is-success">Valider</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="column is-narrow">
                        <a onClick={() => {
                            props.deleteList(props.id);
                        }} href="#" className="is-pulled-right ml-2">
                            <span className="icon is-small has-text-white">
                                <i className="fas fa-trash-alt"></i>
                            </span>
                        </a>
                        <a onClick={showCardModal} href="#" className="is-pulled-right">
                            <span className="icon is-small has-text-white">
                                <i className="fas fa-plus"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            <div className="panel-block is-block has-background-light">
                {props.cards.map((card, index) => {
                    // Si l'id de la carte est le même que l'id de la liste alors la carte est créée
                    return card.list_id === +props.id &&
                        <Card
                            key={index}
                            content={card.name}
                            listId={props.listId}
                            id={card.id}
                            deleteCard={props.deleteCard}
                            handleEditCardContent={props.handleEditCardContent}
                            tags={card.tags}
                            dissociateTagToCard={props.dissociateTagToCard}
                        />;
                })}
            </div>
        </div>
    )
}

export default List;