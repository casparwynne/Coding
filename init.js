import { navAddListener, formFunctionality, modalAddListener } from "./eventHandler.js";
import { updateWeaponTable, updateInventoryTable } from "./table.js";
//default character data

const defaultData = {
    name: "Placeholder Name",
    picture: "./assets/profile_pic.png",
    age: 18,
    occupation: "Comms Technician",
    movement: 25,
    money: 100,
    biography: "enter",
    abilities: [
        { class: "ability", id: "str", name: "Strength", value: 0, hover: "strength" },
        { class: "ability", id: "dex", name: "Dexterity", value: 0, hover: "note" },
        { class: "ability", id: "con", name: "Constitution", value: 0, hover: "note" },
        { class: "ability", id: "wis", name: "Wisdom", value: 0, hover: "note" },
        { class: "ability", id: "int", name: "Intelligence", value: 0, hover: "note" },
        { class: "ability", id: "cha", name: "Charisma", value: 0, hover: "note" },
    ],
    statuses: [
        { class: "status", id: "hp", name: "Current HP", value: 0, hover: "note" },
        { class: "status", id: "sanity", name: "Sanity", value: 0, hover: "note" },
        { class: "status", id: "stability", name: "Stability", value: 0, hover: "note" },
        { class: "status", id: "inspiration", name: "Inspiration", value: 0, hover: "note" },
    ],
    skills: [
        { class: "skill", id: "accounting", name: "Accounting", value: 0, hover: "note" },
        { class: "skill", id: "anthropology", name: "Anthropology", value: 0, hover: "note" },
        { class: "skill", id: "appraise", name: "Appraise", value: 0, hover: "note" },
        { class: "skill", id: "archaeology", name: "Archaeology", value: 0, hover: "note" },
        { class: "skill", id: "art_craft", name: "Art/Craft", value: 0, hover: "note" },
        { class: "skill", id: "charm", name: "Charm", value: 0, hover: "note" },
        { class: "skill", id: "climb", name: "Climb", value: 0, hover: "note" },
        { class: "skill", id: "computer_coding", name: "Computer Coding", value: 0, hover: "note" },
        { class: "skill", id: "credit_rating", name: "Credit Rating", value: 0, hover: "note" },
        { class: "skill", id: "disguise", name: "Disguise", value: 0, hover: "note" },
        { class: "skill", id: "dodge", name: "Dodge", value: 0, hover: "note" },
        { class: "skill", id: "drive_auto", name: "Drive Auto", value: 0, hover: "note" },
        { class: "skill", id: "elec_repair", name: "Elec Repair", value: 0, hover: "note" },
        { class: "skill", id: "fast_talk", name: "Fast Talk", value: 0, hover: "note" },
        { class: "skill", id: "fighting_brawl", name: "Fighting (Brawl)", value: 0, hover: "note" },
        { class: "skill", id: "firearms_handgun", name: "Firearms (Handgun)", value: 0, hover: "note" },
        { class: "skill", id: "firearms_rifle", name: "Firearms (Rifle/Shotgun)", value: 0, hover: "note" },
        { class: "skill", id: "first_aid", name: "First Aid", value: 0, hover: "note" },
        { class: "skill", id: "hacking", name: "Hacking", value: 0, hover: "note" },
        { class: "skill", id: "history", name: "History", value: 0, hover: "note" },
        { class: "skill", id: "intimidate", name: "Intimidate", value: 0, hover: "note" },
        { class: "skill", id: "investigation", name: "Investigation", value: 0, hover: "note" },
        { class: "skill", id: "jump", name: "Jump", value: 0, hover: "note" },
        { class: "skill", id: "language_other", name: "Language (Other)", value: 0, hover: "note" },
        { class: "skill", id: "language_own", name: "Language (Own)", value: 0, hover: "note" },
        { class: "skill", id: "law", name: "Law", value: 0, hover: "note" },
        { class: "skill", id: "library_use", name: "Library Use", value: 0, hover: "note" },
        { class: "skill", id: "listen", name: "Listen", value: 0, hover: "note" },
        { class: "skill", id: "locksmiths", name: "Locksmith", value: 0, hover: "note" },
        { class: "skill", id: "mechanical_repair", name: "Mechanical Repair", value: 0, hover: "note" },
        { class: "skill", id: "natural_world", name: "Natural World", value: 0, hover: "note" },
        { class: "skill", id: "navigate", name: "Navigate", value: 0, hover: "note" },
        { class: "skill", id: "occult", name: "Occult", value: 0, hover: "note" },
        { class: "skill", id: "operate_heavy_machinery", name: "Operate Heavy Machinery", value: 0, hover: "note" },
        { class: "skill", id: "persuasion", name: "Persuasion", value: 0, hover: "note" },
        { class: "skill", id: "pilot", name: "Pilot", value: 0, hover: "note" },
        { class: "skill", id: "psychology", name: "Psychology", value: 0, hover: "note" },
        { class: "skill", id: "psychoanalysis", name: "Psychoanalysis", value: 0, hover: "note" },
        { class: "skill", id: "ride", name: "Ride", value: 0, hover: "note" },
        { class: "skill", id: "science", name: "Science", value: 0, hover: "note" },
        { class: "skill", id: "slight_of_hand", name: "Sleight of Hand", value: 0, hover: "note" },
        { class: "skill", id: "spacewalking", name: "Spacewalking", value: 0, hover: "note" },
        { class: "skill", id: "space_anomalies", name: "Space Anomalies", value: 0, hover: "note" },
        { class: "skill", id: "spot_hidden", name: "Spot Hidden", value: 0, hover: "note" },
        { class: "skill", id: "streetwise", name: "Streetwise", value: 0, hover: "note" },
        { class: "skill", id: "stealth", name: "Stealth", value: 0, hover: "note" },
        { class: "skill", id: "survival", name: "Survival", value: 0, hover: "note" },
        { class: "skill", id: "swim", name: "Swim", value: 0, hover: "note" },
        { class: "skill", id: "throw", name: "Throw", value: 0, hover: "note" },
        { class: "skill", id: "track", name: "Track", value: 0, hover: "note" },
    ],
    items: [
        { name: "Unarmed", equipped: true, category: "weapon", description: "Your bare hands baby!", meleeDamage: "1d4+1", rangeDamage: "1d6+1", damageType: "Melee", ammo: "", specialAbility: false, specialAbilityName: "", specialAbilityDesc: "", target: "Others", effectChoice: "", effects: "", benefactor: "", usesType: "", totalUses: "0", remainingUses: "0" },
        { name: "Stun Gun", equipped: true, category: "weapon", description: "The old shoot and sting.", meleeDamage: "1d4+1", rangeDamage: "1d6+1", damageType: "Ranged", ammo: "4", specialAbility: true, specialAbilityName: "Overload", specialAbilityDesc: "Set to overload - in one minute a small EMP is released", target: "Self", effectChoice: "Harm", effects: "Status", benefactor: "HP", usesType: "limited", totalUses: "1", remainingUses: "1" },
        { name: "Used Tissue", equipped: false, category: "junk", quantity: 1, description: "A snotty rag", specialAbility: false, specialAbilityName: "", specialAbilityDesc: "", target: "", effectChoice: "", effects: "", benefactor: "", usesType: "", totalUses: "0", remainingUses: "0", meleeDamage: "", rangeDamage: "", damageType: "", ammo: "" },
        { name: "Water Bottle", equipped: false, category: "consumables", quantity: 1, description: "Bottle of your best Jovian ice water", specialAbility: true, specialAbilityName: "Sate", specialAbilityDesc: "Restores HP for 1d4+3", target: "Self", effectChoice: "Aid", effects: "Status", benefactor: "HP", usesType: "limited", totalUses: "1", remainingUses: "1", meleeDamage: "", rangeDamage: "",  damageType: "", ammo: "" },
        { name: "Solvent", equipped: false, category: "consumables", quantity: 1, description: "Bottle of your common garden solvent cleaner", specialAbility: true, specialAbilityName: "Burn", specialAbilityDesc: "Reduces HP for 1d4+3", target: "Self/Others", effectChoice: "Harm", effects: "Status", benefactor: "HP", usesType: "limited", totalUses: "1", remainingUses: "1", meleeDamage: "", rangeDamage: "",  damageType: "", ammo: "" }
    ],
    "ship": {
        "name": "The Rampant Whippet",
        "class": "Explorer",
        "fuel": 9,
        "maxFuel": 9,
        "health": 100,
        "capacity": 500,
        "abilities": [
            {
                "name": "Long Range Scanners",
                "description": "Can detect long range signals such as LADAR"
            }
        ]
        // Include other relevant ship properties here
    }
};
//default premade data
export const premadeItems = {
    items: [
        { name: "T-Shirt", equipped: false, category: "clothing", description: "Light weight garment", specialAbility: false, specialAbilityName: "", specialAbilityDesc: "", effectChoice: "", effects: "", benefactor: "", usesType: "", totalUses: "0", remainingUses: "0", damage: "", damageType: "", ammo: "" },
        { name: "Water Bottle", equipped: false, category: "consumables", description: "Bottle of your best Jovian ice water", specialAbility: true, specialAbilityName: "Sate", specialAbilityDesc: "Replenishes health", effectChoice: "Aid", effects: "Status", benefactor: "Current HP", usesType: "limited", totalUses: "1", remainingUses: "1", damage: "", damageType: "", ammo: "" },
        { name: "Wrench", equipped: false, category: "tools", description: "She bites...", specialAbility: true, specialAbilityName: "Clamp", specialAbilityDesc: "Tightens or loosens bolts with remarkable force", effectChoice: "Harm", effects: "Status", benefactor: "Current HP", usesType: "limited", totalUses: "1", remainingUses: "1", damage: "", damageType: "", ammo: "" },
        { name: "Notebook", equipped: false, category: "questItems", description: "Your Journal", specialAbility: false, specialAbilityName: "", specialAbilityDesc: "", effectChoice: "", effects: "", benefactor: "", usesType: "", totalUses: "0", remainingUses: "0", damage: "", damageType: "", ammo: "" },
        { name: "Solvent", equipped: false, category: "consumables", description: "Bottle of your common garden solvent cleaner", specialAbility: true, specialAbilityName: "Burn", specialAbilityDesc: "Reduces HP for 1d4+3", target: "Self/Others", effectChoice: "Harm", effects: "Status", benefactor: "HP", usesType: "limited", totalUses: "1", remainingUses: "1", damage: "", damageType: "", ammo: "" },
        { name: "Unarmed", equipped: false, category: "weapon", description: "Your bare hands baby!", meleeDamage: "2d4+4", rangeDamage: "1d8+2", damageType: "Melee", ammo: "", specialAbility: false, specialAbilityName: "", specialAbilityDesc: "", target: "", effectChoice: "", effects: "", benefactor: "", usesType: "", totalUses: "0", remainingUses: "0" },
        { name: "Stun Gun", equipped: false, category: "weapon", description: "The old shoot and sting.", meleeDamage: "2d6", rangeDamage: "1d10+1", damageType: "Ranged", ammo: "1", specialAbility: true, specialAbilityName: "Overload", specialAbilityDesc: "Set to overload - in one minute a small EMP is released", target: "Self", effectChoice: "Harm", effects: "Status", benefactor: "HP", usesType: "limited", totalUses: "1", remainingUses: "1" }
    ]
};
//deep clone of player data
export let playerData = JSON.parse(JSON.stringify(defaultData));
//deep clone of premade data
export let playerPremadeItems = JSON.parse(JSON.stringify(premadeItems));

const sectionHeads = [
    { title: "Ship", function: createShipUI },
    { title: "Statuses", function: createStatusUI },
    { title: "Abilities", function: createAbilityUI },
    { title: "Skills", function: createSkillUI },
    { title: "Inventory", function: createInventoryUI }
];

document.addEventListener('DOMContentLoaded', () => {
    createUI();
    loadData();
    navAddListener();
    modalAddListener()
    formFunctionality();
    updateTime();
    setInterval(updateTime, 30000); // Update time every 60 seconds
    updateUI(playerData);


});


function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.querySelector('.timeDisplay').textContent = `${hours}:${minutes}`;
}
function createUI() {
    //getting content div
    let content = document.getElementById('content');
    if (content) {
        // clearing any existing data
        content.innerHTML = ''
        //check that defaultData has picture root
        const profile_container = document.createElement('div');
        profile_container.id = 'profile_container';

        if (defaultData.picture) {
            const profilePicture = document.createElement('img');
            profilePicture.className = 'profilePicture';
            profilePicture.alt = 'Profile Picture';
            profilePicture.src = defaultData.picture;
            profile_container.appendChild(profilePicture);
        } else {
            console.log('No picture...')
        }

        createEditableText('Name: ', defaultData.name, 'name', profile_container);
        createEditableText('Occupation: ', defaultData.occupation, 'occupation', profile_container);    
        createEditableText('Age: ', defaultData.age, 'age', profile_container);
        createEditableText('Money: ', defaultData.money, 'money', profile_container);
        createEditableText('Movement: ', defaultData.movement, 'movement', profile_container);

        const restBtn = document.createElement('button');
        restBtn.textContent = "Rest";
        restBtn.id = "longRest";
        restBtn.addEventListener('click', function () {
            console.log("resting...")
        });

        profile_container.appendChild(restBtn)

        content.appendChild(profile_container)
        //end of profile
        createSection(content);
    } else {
        console.log("Cannot find content...");
    }
}
function createEditableText(labelText, textValue, dataKey, parent) {
    const container = document.createElement('div');
    container.id = `${dataKey}-container`
    container.style.textAlign = 'center'; // Center align the text
    container.style.marginTop = '10px'; // Add some space above the container

    const label = document.createElement('span');
    label.textContent = labelText;
    label.style.fontWeight = 'bold'; // Optional: make the label bold

    const text = document.createElement('span');
    text.textContent = textValue;
    text.id = dataKey;
    text.contentEditable = true;
    text.style.marginLeft = '5px'; // Space between label and editable text

    // Limit character length to 100
    text.addEventListener('input', () => {
        if (text.textContent.length > 100) {
            text.textContent = text.textContent.slice(0, 100);
        }
    });

    // Save data and exit editing when Enter key is pressed
    text.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default behavior of Enter key
            text.blur(); // Remove focus from editable text
        }
    });

    text.onblur = () => {
        // Update playerData directly for these specific fields
        playerData[dataKey] = text.textContent;
        saveData(); // Save data when text loses focus
    };

    container.appendChild(label);
    container.appendChild(text);
    parent.appendChild(container);

}
function createSection(content) {
    for (let i = 0; i < sectionHeads.length; i++) {

        const currentSection = sectionHeads[i];
        const containerName = currentSection.title.toLowerCase() + '_container';
        const contentName = currentSection.title.toLowerCase() + '_content';

        const container = document.createElement('div');
        container.id = containerName;

        const header = document.createElement('h2');
        header.innerText = currentSection.title;
        header.className = 'collapsible';

        const section_content = document.createElement('div');
        section_content.id = contentName;

        container.appendChild(header);
        container.appendChild(section_content);
        content.appendChild(container);

        const functionToCall = currentSection.function;

        header.addEventListener('click', function () {
            this.classList.toggle('active');
            section_content.style.display = section_content.style.display === 'none' ? 'block' : 'none';
        });

        functionToCall();
    }
}
function createShipUI() {
    const section_content = document.getElementById('ship_content');
    const shipData = playerData.ship;
    
    const shipName = document.createElement('p');
    shipName.innerHTML = `<strong>Name: </strong><span contenteditable="true" id="shipNameEditable">${shipData.name}</span>`;
    section_content.appendChild(shipName);

    shipName.addEventListener('blur', function() {
        // Update shipData with new name from contenteditable field
        shipData.name = document.getElementById('shipNameEditable').textContent;
        saveData(); // Function to save data to your data store
    });

    const shipType = document.createElement('p');
    shipType.innerHTML = `<strong>Class: </strong>${shipData.class}`;
    section_content.appendChild(shipType);

    const shipHealth = document.createElement('p');
    shipHealth.innerHTML = `<strong>Health: </strong>${shipData.health}`;
    section_content.appendChild(shipHealth);

    const shipCapacity = document.createElement('p');
    shipCapacity.innerHTML = `<strong>Class: </strong>${shipData.capacity}`;
    section_content.appendChild(shipCapacity);

    // Adding fuel bar
    const fuelBarContainer = document.createElement('div');
    fuelBarContainer.className = 'fuel-bar-container';
    fuelBarContainer.style.border = '5px solid #ccc';
    fuelBarContainer.style.width = '200px';
    fuelBarContainer.style.height = '20px';

    const fuelBar = document.createElement('div');
    fuelBar.className = 'fuel-bar';
    fuelBar.style.width = `${(shipData.fuel / shipData.maxFuel) * 100}%`;
    fuelBar.style.height = '100%';
    fuelBar.style.backgroundColor = 'green';

    fuelBarContainer.appendChild(fuelBar);
    section_content.appendChild(fuelBarContainer);

    const useFuelButton = document.createElement('button');
    useFuelButton.className = 'useFuel';
    useFuelButton.textContent = 'Use Fuel';
    useFuelButton.onclick = function () {
        console.log("Using fuel...");
        if (shipData.fuel > 0) {
            shipData.fuel -= 1;  // Decrease fuel by one unit per click
            fuelBar.style.width = `${(shipData.fuel / shipData.maxFuel) * 100}%`;
            console.log(`Fuel left: ${shipData.fuel}`);
            useFuelButton.disabled = shipData.fuel === 0; // Disable if no fuel left
        }
    };

    const refuelButton = document.createElement('button');
    refuelButton.className = 'refuel';
    refuelButton.textContent = 'Refuel';

    // Add input field for refueling amount
    const refuelInput = document.createElement('input');
    refuelInput.type = 'number';
    refuelInput.value = '1';  // Default increment
    refuelInput.min = '1';
    refuelInput.max = shipData.maxFuel - shipData.fuel;  // Max value is the available capacity

    refuelButton.onclick = function () {
        console.log("Refueling...");
        const refuelAmount = parseInt(refuelInput.value, 10); // Get the input value and parse it as integer
        if (refuelAmount > 0 && shipData.fuel + refuelAmount <= shipData.maxFuel) {
            shipData.fuel += refuelAmount; // Increase fuel by the specified amount
            fuelBar.style.width = `${(shipData.fuel / shipData.maxFuel) * 100}%`;
            console.log(`Refueled: ${refuelAmount} units, Total fuel: ${shipData.fuel}`);
            useFuelButton.disabled = false; // Enable use button
        }
    };

    section_content.appendChild(useFuelButton);
    section_content.appendChild(refuelButton);

    // List ship abilities
    shipData.abilities.forEach((ability) => {
        const abilityElem = document.createElement('p');
        abilityElem.innerHTML = `<strong>${ability.name}: </strong>${ability.description}`;
        section_content.appendChild(abilityElem);
    });
}
function createAbilityUI() {
    const section_content = document.getElementById('abilities_content');
    createGridSection('Abilities', playerData.abilities, section_content);
}
function createStatusUI() {
    const section_content = document.getElementById('statuses_content');
    createGridSection('Statuses', playerData.statuses, section_content);
}
function createSkillUI() {
    const section_content = document.getElementById('skills_content');
    createGridSection('Skills', playerData.skills, section_content);
}
function createInventoryUI() {
    const table_structure_item = ["Name", "Category", "Quantity", "Equipped", "Actions"];
    const table_structure_weapon = ["Name", "Damage", "Type", "Ammo", "Equipped", "Actions"];

    const section_content = document.getElementById('inventory_content');
    createTableSettings("inventory", "Item", section_content);
    createTable(table_structure_item, "inventory", section_content);
    createTable(table_structure_weapon, "weapons", section_content);

}
function createGridSection(title, items, parent) {
    // Container for grid items
    const gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.id = title.toLowerCase() + '-container';

    items.forEach(item => {
        // Correctly creating and naming the button container
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container'; // Fixed typo here

        // Item container
        const itemContainer = document.createElement('div');
        itemContainer.className = 'grid-item';

        // Name
        const itemName = document.createElement('div');
        itemName.className = 'item-name'; // Ensure this class is used in CSS for styling
        itemName.textContent = item.name;
        itemContainer.appendChild(itemName);

        // Value
        const itemValue = document.createElement('div');
        itemValue.textContent = item.value;
        itemValue.id = `item_value_id_${item.id}`;
        itemValue.className = 'item-value'; // Ensure this class is used in CSS for styling
        itemContainer.appendChild(itemValue);

        // Buttons
        const decrementButton = document.createElement('button');
        decrementButton.textContent = '-';
        decrementButton.dataset.type = 'decrement'; // Custom data attribute to signify action
        decrementButton.dataset.id = item.id; // Custom data attribute for identifying the item
        decrementButton.addEventListener('click', handleValueChange); // Event listener for click
        buttonContainer.appendChild(decrementButton);

        const incrementButton = document.createElement('button');
        incrementButton.textContent = '+';
        incrementButton.dataset.type = 'increment';
        incrementButton.dataset.id = item.id;
        incrementButton.addEventListener('click', handleValueChange);
        buttonContainer.appendChild(incrementButton);

        itemContainer.appendChild(buttonContainer);
        gridContainer.appendChild(itemContainer);
    });

    parent.appendChild(gridContainer);
}
function handleValueChange(event) {
    const { id, type } = event.target.dataset;

    let updated = false; // Flag to check if update was performed

    // Iterate through each category to find and update the correct item
    ['abilities', 'statuses', 'skills'].forEach(category => {
        if (updated) return; // If already updated, skip further checks

        const itemIndex = playerData[category].findIndex(item => item.id === id);
        if (itemIndex !== -1) {
            const item = playerData[category][itemIndex];
            if (type === 'increment' && item.value < 100) item.value++;
            if (type === 'decrement' && item.value > 0) item.value--;

            // Reflect this change in the UI
            document.getElementById(`item_value_id_${id}`).textContent = item.value;
            updated = true; // Mark as updated
        }
    });

    if (updated) {
        saveData();
    }
}
function createTable(tableHeader, name, parent) {

    const tableContainer = document.createElement('div');
    tableContainer.id = `table-container-${name}`;
    tableContainer.className = 'table-container';
    const header = document.createElement('h3');
    header.className = 'miniheader';
    header.innerHTML = `${name.toUpperCase()}`
    tableContainer.appendChild(header);

    const table = document.createElement('table');
    table.className = 'table-style';

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');

    for (let header in tableHeader) {
        const th = document.createElement('th');
        th.innerText = tableHeader[header];
        th.className = name + '_' + header;
        tr.appendChild(th)
    }
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    tbody.id = name + '-tbody'
    table.appendChild(tbody);
    tableContainer.appendChild(table);
    parent.appendChild(tableContainer);

    let specialAbility = document.createElement('div');
    specialAbility.id = name + 'specialAbility-container';
    specialAbility.className = 'specialAbility-container';
    const hr = document.createElement('hr');
    parent.appendChild(specialAbility);
    parent.appendChild(hr);
}
function createTableSettings(somesettingType, name, parent) {
    const tableSettings = document.createElement('div');
    tableSettings.id = somesettingType + '-settings';

    const addButton = document.createElement('button');
    addButton.setAttribute('name', 'item');
    addButton.textContent = 'Add ' + name;
    addButton.className = 'addButton';
    addButton.addEventListener('click', () => {
        showModal();
    })

    tableSettings.appendChild(addButton);
    parent.appendChild(tableSettings);
}
export function showModal() {
    document.getElementById('modal-container').style.display = 'flex';
    document.getElementById('addInventory').style.display = 'block';
}
export function loadData() {
    try {
        const serializedData = localStorage.getItem('playerData');
        if (serializedData !== null) {
            playerData = JSON.parse(serializedData);
        } else {
            console.log("No saved data found.");
        }
    } catch (error) {
        console.error("Error loading data:", error);
    }
}
export function updateUI() {
    console.log("Updating UI...");

    const charNameElement = document.getElementById('name');
    const shipNameElement = document.getElementById('shipName');
    const ageElement = document.getElementById('age');
    const movementElement = document.getElementById('movement');

    if (charNameElement) charNameElement.textContent = playerData.name;
    if (shipNameElement) shipNameElement.textContent = playerData.shipName;
    if (ageElement) ageElement.textContent = playerData.age;
    if (movementElement) movementElement.textContent = playerData.movement;

    updateItemsUI(playerData.abilities);
    updateItemsUI(playerData.statuses);
    updateItemsUI(playerData.skills);

    updateWeaponTable(playerData);
    updateInventoryTable(playerData);
}
function updateItemsUI(items) {
    items.forEach(item => {
        const itemValueElement = document.getElementById(`item_value_id_${item.id}`);
        if (itemValueElement) {
            itemValueElement.textContent = item.value;
        }
    });
}
export function saveData() {
    console.log("saving...");
    try {
        const serializedData = JSON.stringify(playerData);
        localStorage.setItem('playerData', serializedData);
        console.log("Data saved successfully.");
    } catch (error) {
        console.error("Error saving data:", error);
    }
}
export function saveAsData() {
    const jsonData = JSON.stringify(playerData, null, 4);
    const blob = new Blob([jsonData], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const fileName = 'player_data.json';

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
export function logPlayerData() {
    console.log(playerData)
}