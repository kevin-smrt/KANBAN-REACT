import { useState } from "react";
import Tag from "./Tag";

function Card(props) {
    const [cardContent, setCardContent] = useState("");

    // Garde en memoire dans la variable cardContent le contenue de la carte
    function handleCardContent(event) {
        const value = event.target.value;
        setCardContent(value);
    }

    // Affiche la modal d'edition de carte
    function handleEditCardModal(event) {
        // Récupère le formulaire
        // Event.target = svg file (icone) => closest(.columns) = div la plus proche du formulaire => querySelector("form") = cible le formulaire
        // Closest ne fonctionne pas si je met directement event.target.closest("form") => à voir pourquoi
        const form = event.target.closest('.columns').querySelector(".card-form");
        const content = event.target.closest('.columns').querySelector(".card-content");

        form.classList.remove("is-hidden");
        content.classList.add("is-hidden");
    }

    // Ferme la modal et envoie la modification de carte à l'API
    function handleSaveEditCard(event) {
        event.preventDefault();
        // Récupère le formulaire
        // Event.target = svg file (icone) => closest(.columns) = div la plus proche du formulaire => querySelector("form") = cible le formulaire
        // Closest ne fonctionne pas si je met directement event.target.closest("form") => à voir pourquoi
        const form = event.target.closest('.columns').querySelector(".card-form");
        const content = event.target.closest('.columns').querySelector(".card-content");

        form.classList.add("is-hidden");
        content.classList.remove("is-hidden");

        props.handleEditCardContent(cardContent, props.id, props.listId);
    }

    // Affiche la modal pour créer un tag
    function handleTagModal() {
        const tagModal = document.getElementById("addTagModal");

        tagModal.classList.add("is-active");
    }

    // Affiche la modal pour associer un tag à une carte
    function handleAssociateTagModal(event) {
        const associateTagModal = document.getElementById("associateTagModal");

        associateTagModal.classList.add("is-active");
        associateTagModal.dataset.cardId = props.id;
    } 

    return (
        <div className="box">
            <div className="columns flex">
                <a onClick={handleAssociateTagModal} href="#" className="is-pulled-right">
                    <span className="icon is-small has-text-info">
                        <i className="fas fa-plus"></i>
                    </span>
                </a>
                <div>
                {props.tags.map((tag, index) => {
                    return <Tag key={index} cardId={props.id} id={tag.id} color={tag.color} name={tag.name} dissociateTagToCard={props.dissociateTagToCard} />
                })}
                </div>
                <div className="column card-content">
                    {props.content}
                </div>
                <form action="" method="POST" className="is-hidden card-form">
                    <div className="field has-addons">
                        <div className="control">
                            <input autoComplete='off' onChange={handleCardContent} type="text" className="input is-small" value={cardContent}
                                placeholder="Contenu de la carte" />
                        </div>
                        <div className="control">
                            <button
                                onClick={handleSaveEditCard}
                                className="button is-small is-success">
                                    Valider
                            </button>
                        </div>
                    </div>
                </form>
                <div className="column is-narrow">
                    <a onClick={handleEditCardModal} href="#">
                        <span className="icon is-small has-text-primary">
                            <i className="fas fa-pencil-alt"></i>
                        </span>
                    </a>
                    <a onClick={handleTagModal} href="#" className="ml-2">
                        <span className="icon is-small has-text-info">
                            <i className="fas fa-tag"></i>
                        </span>
                    </a>
                    <a onClick={() => { props.deleteCard(props.id) }} href="#" className="ml-2">
                        <span className="icon is-small has-text-danger">
                            <i className="fas fa-trash-alt"></i>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Card;