import React, { useState } from "react";

function AddCardModal(props) {
    // Constante avec le contenu de la carte en train d'être créée
    const [cardContent, setCardContent] = useState("");

    // Ferme la modale de carte
    function closeCardModal() {
        const modal = document.getElementById("addCardModal")
        modal.classList.remove("is-active");
    }

    // Gère l'envoie de la carte vers App qui l'ajoute dans l'array carte
    function handleAddCardForm(event) {
        const cardModal = document.getElementById("addCardModal")

        event.preventDefault();

        // Récupère l'id de la liste pour pouvoir appartenir a la bonne liste
        const card = {listId: cardModal.dataset.listId, content: cardContent};

        props.addCard(card)

        setCardContent("");

        cardModal.classList.remove("is-active");
    }

    // Gère le changement de contenue de la carte
    function handleCardContentChange(event) {
        const value = event.target.value;
        setCardContent(value);
    }

    return (
        <div className="modal" id="addCardModal" data-list-id="">
            <div className="modal-background"></div>
            <div className="modal-card">
                <form action="" method="POST">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Ajouter une carte</p>
                        <button onClick={closeCardModal} className="delete close" type="button" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Contenu</label>
                            <div className="control">
                                <input onChange={handleCardContentChange} type="text" className="input" value={cardContent} placeholder="Contenu de la carte" autoComplete="off" />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={handleAddCardForm} className="button is-success">Sauvegarder</button>
                        <button onClick={closeCardModal} className="button close" type="button">Annuler</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default AddCardModal;