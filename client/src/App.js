import './App.css';

import React, { useState } from "react";

import AddListModal from './AddListModal';
import AddCardModal from './AddCardModal';
import AddListButton from './AddListButton';
import List from './List';
import AddTagModal from './AddTagModal';
import AssociateTagToCard from './AssociateTagToCard';

function App() {
    const baseUrl = "http://localhost:5050";
    // Ajout des constantes qui contiennent les listes et les cartes
    const [lists, setLists] = useState([]);
    const [tags, setTags] = useState([]);

    // Charge toutes les listes au chargement de la page
    document.addEventListener('DOMContentLoaded', async () => {
        getAllLists();
    });
    
    // Récupère toute les listes
    async function getAllLists() {
        const response = await fetch(`${baseUrl}/lists`);
        const databaseLists = await response.json();
        
        setLists(databaseLists);
        getAllTags();
    }

    // Supprime une liste
    async function deleteList(id) {
        await fetch(`${baseUrl}/lists/${id}`, {
            method: "DELETE",
        });
        
        getAllLists();
    }

    // Fonction d'ajout d'une liste dans l'array de liste
    async function addList(list) {
        const response = await fetch(`${baseUrl}/lists`, {
            method: "POST",
            body: JSON.stringify({
                name: list.name,
                cards: []
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        const newList = await response.json();
        setLists(prevLists => {
            return [
                ...prevLists,
                newList
            ];
        });
    }

    // Fonction d'ajout d'une carte dans l'array de carte
    async function addCard(card) {
        await fetch(`${baseUrl}/cards`, {
            method: "POST",
            body: JSON.stringify({
                name: card.content,
                list_id: card.listId
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        getAllLists();
    }

    // Supprime une carte
    async function deleteCard(id) {
        await fetch(`${baseUrl}/cards/${id}`, {
            method: "DELETE",
        });
        getAllLists();
    }

    // Gère le changement de nom d'une liste
    async function handleEditListTitle(newTitle, listId) {
        await fetch(`${baseUrl}/lists/${listId}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: newTitle,
                list_id: listId
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        getAllLists();
    }

    // Gère le changement de contenu d'une carte
    async function handleEditCardContent(newContent, cardId, listId) {
        await fetch(`${baseUrl}/cards/${cardId}`, {
            method: "PATCH",
            body: JSON.stringify({
                name: newContent,
                list_id: listId
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        getAllLists();
    }

    // Ajoute un tag
    async function addTag(tagInfos) {
        await fetch(`${baseUrl}/tags`, {
            method: "POST",
            body: JSON.stringify({
                name: tagInfos.name,
                color: tagInfos.color
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        getAllLists();
    }

    // Retourne tous les tags existants
    async function getAllTags() {
        const response = await fetch(`${baseUrl}/tags`);
        const databaseTags = await response.json();
        
        setTags(databaseTags);
    }

    // Associe un tag à une carte
    async function associateTagToCard(cardId, tagId) {
        await fetch(`${baseUrl}/cards/${cardId}/tag`, {
            method: "POST",
            body: JSON.stringify({
                cardId: cardId,
                tag_id: tagId
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        getAllLists();
    }

    // Dissocie un tag d'une carte
    async function dissociateTagToCard(cardId, tagId) {
        await fetch(`${baseUrl}/cards/${cardId}/tag/${tagId}`, {
            method: "DELETE",
            body: JSON.stringify({
                cardId: cardId,
                tagId: tagId
            }),
            headers: {
                "Content-Type": "application/json; charset=UTF-8"
            }
        });
        getAllLists();
    }

    return (
        <div>
            <section className="section ">
                <div className="container">
                    <h1 className="title">Kanban</h1>
                    <div className="columns">
                        <div className="column is-full">
                            <div className="card-lists columns">
                                {lists.map((list, index) => {
                                    return <List
                                                key={index}
                                                title={list.name}
                                                cards={list.cards}
                                                id={list.id}
                                                deleteList={deleteList}
                                                deleteCard={deleteCard}
                                                handleEditListTitle={handleEditListTitle}
                                                handleEditCardContent={handleEditCardContent}
                                                dissociateTagToCard={dissociateTagToCard}
                                            />
                                })}
                            </div>
                        </div>
                        <AddListButton />
                    </div>
                </div>
            </section>
            <AddListModal addList={addList} />
            <AddCardModal addCard={addCard} />
            <AddTagModal addTag={addTag} tags={tags}/>
            <AssociateTagToCard tags={tags} associateTagToCard={associateTagToCard}/>
        </div>
    );
}

export default App;
