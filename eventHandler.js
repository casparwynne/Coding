import { saveData, saveAsData, loadData, playerData, updateUI, premadeItems } from "./init.js";

export function navAddListener() {
    const saveBtn = document.getElementById("saveBtn");
    const saveAsBtn = document.getElementById("saveAsBtn");
    const loadBtn = document.getElementById("loadBtn");
    const newBtn = document.getElementById("newBtn");

    saveBtn.addEventListener('click', () => {
        saveData();
    })

    saveAsBtn.addEventListener('click', () => {
        saveAsData();
    })

    loadBtn.addEventListener('click', () => {
        loadData();
    })

    newBtn.addEventListener('click', () => {
        newGame();
    })

}

export function formFunctionality() {
    const categorySelect = document.getElementById('category');
    const itemTypeRadios = document.querySelectorAll('input[name="itemType"]');
    const premadeItemGroup = document.getElementById('premade-item-group');
    const premadeDropdown = document.getElementById('premadeItemsDropdown');
    const weaponBox = document.querySelector('.weapon-box');
    const specialAbilityBox = document.querySelector('.specialAbility-box');
    const effectsDropdown = document.querySelector('#effects')
    const modifiedDropdown = document.getElementById('modified')
    const meleeCheckbox = document.getElementById('melee');
    const rangedCheckbox = document.getElementById('ranged');
    const meleeDamageContainer = document.querySelector('.meleeDamageContainer');
    const rangeDamageContainer = document.querySelector('.rangeDamageContainer');
    const ammoContainer = document.querySelector('.ammoContainer');
    const specialAbilityRadios = document.querySelectorAll('input[name="specialAbility"]');

    categorySelect.addEventListener('change', function () {
        populatePremadeItems(this.value);
        if (this.value === 'weapon') {
            console.log(this.value);
            weaponBox.style.display = 'block';
        } else {
            weaponBox.style.display = 'none';
        }
    });

    premadeDropdown.addEventListener('change', function () {
        const selectedItemName = this.value;
        console.log(this.value);
        const selectedItem = premadeItems.items.find(item => item.name === selectedItemName);
        if (selectedItem) {
            populateFormFields(selectedItem);
        }
    })

    effectsDropdown.addEventListener('change', function () {
        const selectedEffects = this.value;
        populateModified(selectedEffects, modifiedDropdown);
    })

    itemTypeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'Premade') {
                premadeItemGroup.style.display = 'block';
                populatePremadeItems(categorySelect.value);
                populateFormFields(premadeDropdown.value);
            } else {
                premadeItemGroup.style.display = 'none';
            }
        });
    });

    meleeCheckbox.addEventListener('change', function () {
        meleeDamageContainer.style.display = this.checked ? 'block' : 'none';
    });

    rangedCheckbox.addEventListener('change', function () {
        rangeDamageContainer.style.display = this.checked ? 'block' : 'none';
        ammoContainer.style.display = this.checked ? 'block' : 'none';
    });

    specialAbilityRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            specialAbilityBox.style.display = this.value === 'true' ? 'block' : 'none';
        });
    });
};

function populateModified(effects, dropdown) {
    dropdown.innerHTML = '';
    let categoryItems = [];
    switch (effects.toLowerCase()) {
        case 'ability':
            categoryItems = playerData.abilities;
            break;
        case 'status':
            categoryItems = playerData.statuses;
            break;
        case 'skill':
            categoryItems = playerData.skills;
            break;
        default:
            console.log("Unknown category");
            return; // Exit the function if the category is unknown
    }

    // Populate dropdown with new options
    categoryItems.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.name;
        dropdown.appendChild(option);
    });
}


function populatePremadeItems(selectedCategory) {
    const filteredItems = premadeItems.items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());
    const premadeItemsDropdown = document.getElementById('premadeItemsDropdown');
    premadeItemsDropdown.innerHTML = '';
    filteredItems.forEach(item => {
        let option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name + (item.specialAbility ? ` - ${item.specialAbilityName}` : '');
        premadeItemsDropdown.appendChild(option);
    });
};

function populateFormFields(item) {
    console.log("populating form fields...")
    document.getElementById('itemName').value = item.name;
    console.log(item.name);
    document.getElementById('itemDescription').value = item.description || '';

    // Handle weapon-specific fields if they exist
    const damageTypeContainer = document.getElementById('damageTypeContainer');
    if (item.damage && damageTypeContainer) {
        if (item.range === "Melee") {
            document.getElementById('melee').checked = true;
            document.getElementById('meleeDamage').value = item.damage;
        } else if (item.range === "Ranged") {
            document.getElementById('ranged').checked = true;
            document.getElementById('rangeDamage').value = item.damage;
            document.getElementById('ammo').value = item.ammo || 0;
        }
    }

    // Handle special abilities
    if (item.specialAbility) {
        document.getElementById('specialAbilityTrue').checked = true;
        document.getElementById('specialAbilityDescription').value = item.specialAbilityDesc || '';
        document.getElementById('effectAid').checked = (item.effectChoice === 'Aid');
        document.getElementById('effectHarm').checked = (item.effectChoice === 'Harm');
        document.getElementById('effects').value = item.effects;
        document.getElementById('modified').value = item.benefactor;
        document.getElementById('totalUses').value = item.totalUses;
        document.getElementById('remainingUses').value = item.remainingUses;
    } else {
        document.getElementById('specialAbilityFalse').checked = true;
    }

    // Show or hide fields based on selections
    toggleSpecialAbilityFields(item.specialAbility);
}

function toggleSpecialAbilityFields(hasSpecialAbility) {
    const specialAbilityBox = document.querySelector('.specialAbility-box');
    specialAbilityBox.style.display = hasSpecialAbility ? '' : 'none';
}



export function modalAddListener() {
    // Close button listeners
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const modal = button.closest('.modal');
            console.log(modal);
            closeModal(modal);
        });
    });

    // Form submission listeners
    const forms = document.querySelectorAll('.modalForm');
    forms.forEach(form => {
        form.addEventListener('submit', event => {
            event.preventDefault(); // Prevent default form submission
            handleFormSubmission(form);
        });
    });
}

// Function to handle form submission based on the form's purpose
function handleFormSubmission(form) {
    const formId = form.id;
    switch (formId) {
        case 'itemForm':
            addToInventory(form);
            break;
        case 'reloadForm':
            const reloadWeapon = document.getElementById('reloadWeapon').innerText;
            weaponReloading(reloadWeapon, form);
            break;
        default:
            console.error("Form submission handler not found for: ", formId);
    }
}

// Function to close and reset a modal
function closeModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        const form = modal.querySelector('form');
        if (form) form.reset();
        document.getElementById('modal-container').style.display = 'none';
        console.log('Modal and form reset.');
    } else {
        console.error('Modal to close not found');
    }
}

// Function to add an item to the inventory
function addToInventory(form) {
    const formData = new FormData(form);

    const itemCategory = formData.category;
    console.log(itemCategory);

    const item = {
        name: formData.get('itemName'),
        description: formData.get('itemDescription'),
        category: formData.get('category'),
        damageType: formData.get('damageType'),
        meleeDamage: formData.get('meleeDamage'),
        rangedDamage: formData.get('rangeDamage'),
        ammo: formData.get('ammo'),
        specialAbility: formData.get('specialAbility') === 'true',
        target: formData.get('target'),
        effect: formData.get('effect'),
        effects: formData.get('effects'),
        modified: formData.get('modified'),
        specialAbilityDescription: formData.get('specialAbilityDescription'),
        usesType: formData.get('uses'),
        totalUses: parseInt(formData.get('totalUses'), 10),
        remainingUses: parseInt(formData.get('remainingUses'), 10)
    };

    // Validate data as necessary
    if (!item.name) {
        alert("Item name is required.");
        return;
    }

    // Add item to the appropriate category in playerData
    if (!playerData.items) playerData.items = [];
    playerData.items.push(item);



    // Update UI
    updateUI();
    const modal = document.getElementById('addInventory');
    // Close modal and reset form
    closeModal(modal);
    saveData();
    form.reset();
}

export function filterByName(items, name) {
    return items.filter(item => item.name.toLowerCase() === name.toLowerCase());
}



function weaponReloading(weaponName, form) {
    const ammoInput = document.getElementById('reloadAmmo').value;
    const filteredWeapons = filterByName(playerData.items, weaponName); // Assuming weapons are stored in playerData.weapons
    if (filteredWeapons.length > 0) {
        const weaponObject = filteredWeapons[0]; // Take the first matching weapon
        // Ensure both ammo values are parsed as integers before addition
        const currentAmmo = parseInt(weaponObject.ammo, 10) || 0; // Parse existing ammo as integer, default to 0 if undefined
        const additionalAmmo = parseInt(ammoInput, 10); // Parse input ammo as integer
        weaponObject.ammo = currentAmmo + additionalAmmo; // Sum the two integers
        updateUI(); // Update the UI to reflect changes
    } else {
        alert('Weapon not found!');
    }
    closeModal(form.closest('.modal'));
}


function newGame() {
    console.log("new gaming...");
    // saveAsData();
    localStorage.removeItem('playerData');
    location.reload();
}
