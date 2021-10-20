function AddListButton() {
    // Affiche la modale d'ajout de liste
    function showListModal() {
        const modal = document.getElementById("addListModal");
        modal.classList.add("is-active");
    }

    return (
        <div className="column">
            <button onClick={showListModal} className="button is-success" id="addListButton">
                <span className="icon is-small">
                    <i className="fas fa-plus"></i>
                </span>
                &nbsp; Ajouter une liste
            </button>
        </div>
    )
}

export default AddListButton;