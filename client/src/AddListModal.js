import React, { useState } from "react";

function AddListModal(props) {
    // Constante qui contient les infos de la liste en train d'être créée
    const [listInfo, setListInfo] = useState({
        name: "",
    });

    // Ferme la modale
    function closeModal() {
        const modal = document.getElementById("addListModal")
        modal.classList.remove("is-active");
    }

    // Envoie la liste dans App qui va l'ajouter a l'array de liste
    function handleAddListForm(event) {
        const modal = document.getElementById("addListModal")

        event.preventDefault();

        if (listInfo.name === "") {
            closeModal();
            return;
        }
        
        props.addList(listInfo);

        setListInfo(prevInfos => {
            return {
                ...prevInfos,
                name: "",
            };
        });

        modal.classList.remove("is-active");
    }

    // Gère la valeure que contient le titre de la liste
    function handleListTitleChange(event) {
        const value = event.target.value;
        setListInfo(prevInfo => {
            return {
                ...prevInfo,
                name: value,
            };
        });
    }

    return (
        <div className="modal" id="addListModal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <form action="" method="POST">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Ajouter une liste</p>
                        <button onClick={closeModal} className="delete close" type="button" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Nom</label>
                            <div className="control">
                                <input onChange={handleListTitleChange} type="text" className="input" name="name" value={listInfo.name} placeholder="Nom de la liste" autoComplete="off" />
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={handleAddListForm} className="button is-success">Sauvegarder</button>
                        <button onClick={closeModal} className="button close" type="button">Annuler</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default AddListModal;