import { useState } from "react";

function AddTagModal(props) {
    const [tagInfos, setTagInfos] = useState({
        name: "",
        color: ""
    });

    // Gère le nom du tag
    function handleChangeTagInfos(event) {
        const {name, value} = event.target;
        setTagInfos(prevInfos => {
            return ({
                ...prevInfos,
                [name]: value
            })
        })
    }

    // Ferme la modal de création de tag
    function closeTagModal() {
        const tagModal = document.getElementById("addTagModal");

        // tagModal.dataset.tagId = props.id;
        tagModal.classList.remove("is-active");
        setTagInfos({
            name: "",
            color: ""
        });
    }
    
    // Gère la couleur du tag
    function handleColorTag(event) {
        const index = document.getElementById("addTagModal").querySelector('select').selectedIndex;
        const optionElement = document.getElementById("addTagModal").querySelector('select').childNodes[index];
        const color = optionElement.getAttribute('name');

        setTagInfos(prevInfos => {
            return {
                ...prevInfos,
                color: color
            }
        })
    }

    return (
        <div className="modal" id="addTagModal">
            <div className="modal-background"></div>
            <div className="modal-card">
                <form action="" method="POST">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Créer un tag</p>
                        <button onClick={closeTagModal} className="delete close" type="button" aria-label="close"></button>
                    </header>
                    <section className="modal-card-body">
                        <div className="field">
                            <label className="label">Nom</label>
                            <div className="control">
                                <input onChange={handleChangeTagInfos} type="text" name="name" className="input" placeholder="Nom du tag" value={tagInfos.name} autoComplete="off" />
                            </div>
                        </div>
                    </section>
                    <section className="modal-card-body">
                        <label className="label">Couleur du tag</label>
                        <div className="field select">
                            <select onChange={handleColorTag} className="tag-color">
                                <option name="null">Aucune</option>
                                <option name="#b30c00">Rouge</option>
                                <option name="#3d85c6">Bleue</option>
                                <option name="#93c47d">Vert</option>
                                <option name="#f1c232">Jaune</option>
                            </select>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button onClick={(event) => {
                            event.preventDefault();
                            props.addTag(tagInfos)
                            closeTagModal();
                            }} className="button is-success">Sauvegarder</button>
                        <button onClick={closeTagModal} className="button close" type="button">Annuler</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

export default AddTagModal;