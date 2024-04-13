import { playerData, saveData, showModal, updateUI} from "./init.js";

export function updateWeaponTable(data) {
    const tbody = document.getElementById('weapons-tbody');
    tbody.innerHTML = '';

    // Assuming 'data.items' contains both weapons and other items and we need to filter only weapons
    let weapons = filterByCategory(data.items, 'weapon');  // 'weapon' should be the category for weapons in your data structure

    weapons.forEach(weapon => addWeaponToTable(weapon));
}

export function filterByCategory(items, category) {
    return items.filter(item => item.category.toLowerCase() === category.toLowerCase());
}


export function updateInventoryTable(data) {
    const tbody = document.getElementById('inventory-tbody');
    tbody.innerHTML = '';  // Clear the existing table content

    // Assuming 'data.items' contains all items, filter to get non-weapon items
    let inventoryItems = data.items.filter(item => item.category.toLowerCase() !== 'weapon');

    // Ensure that the filtered result is an array and has elements
    if (Array.isArray(inventoryItems) && inventoryItems.length) {
        inventoryItems.forEach(item => addItemToTable(item));
    } else {
        console.error("No inventory items found or data.items is not properly structured:", inventoryItems);
    }
}

function addWeaponToTable(weapon) {
    const row = document.createElement('tr');
    row.setAttribute('data-weapon-name', weapon.name);

    const nameCell = document.createElement('td');
    nameCell.id = `nameCell-${weapon.name}`;
    nameCell.textContent = weapon.name;
    nameCell.setAttribute('title', weapon.description)
    row.appendChild(nameCell);

    const damageCell = document.createElement('td');
    damageCell.id = `damageCell-${weapon.name}`;
    if (weapon.damageType === 'Melee'){
        damageCell.textContent = weapon.meleeDamage;
        console.log(weapon.name,weapon.meleeDamage);
    }else{
        damageCell.textContent = weapon.rangeDamage;
        console.log(weapon.name,weapon.rangeDamage);
    }

    row.appendChild(damageCell);

    const damageType = document.createElement('td');
    damageType.textContent = weapon.damageType;
    row.appendChild(damageType);

    const ammoCell = document.createElement('td');
    ammoCell.textContent = weapon.ammo;
    row.appendChild(ammoCell);

    const equippedCell = document.createElement('td');
    const equippedCheckbox = document.createElement('input');
    equippedCheckbox.type = 'checkbox';
    equippedCheckbox.checked = weapon.equipped; // Assumes 'weapon.equipped' is a boolean
    equippedCheckbox.className = 'equippedCheckbox';
    equippedCheckbox.id = `equipped-${weapon.name}`;
    equippedCell.appendChild(equippedCheckbox);
    row.appendChild(equippedCell);
    
    // Assuming 'weapon' is correctly passed and structured:
equippedCheckbox.addEventListener('change', (event) => {
    console.log(weapon.ammo);  // Log current ammo to debug
    // Use weapon.ammo to check against 0
    if (weapon.ammo > 0 && event.target.checked) {
        useBtn.disabled = false;  // Enable the button if equipped and has ammo
    } else {
        useBtn.disabled = true;   // Disable the button if not equipped or no ammo
    }
});

// Actions cell for use/delete buttons
const actionsCell = document.createElement('td');
const deleteWeaponBtn = document.createElement('button');
const useBtn = document.createElement('button');
useBtn.textContent = 'Use';
useBtn.className = 'useBtn';

// Conditional disabling/enabling based on weapon type and equipped state
if (weapon.range === 'Ranged') {
    useBtn.disabled = !weapon.equipped || weapon.ammo <= 0;  // Ensure you compare with correct ammo
} else {
    useBtn.disabled = !weapon.equipped;
}


    deleteWeaponBtn.innerHTML = '&times;'
    deleteWeaponBtn.className = 'deleteBtn';
    actionsCell.appendChild(useBtn);

    if (weapon.range === "Ranged") {
        const reloadBtn = document.createElement('button');
        reloadBtn.textContent = 'Reload';
        reloadBtn.className = 'reloadBtn';
        // Add an event listener to the reload button
        reloadBtn.addEventListener('click', function () {
            document.getElementById('reloadWeapon').innerText = weapon.name;
            document.getElementById('modal-container').style.display = 'flex';
            document.getElementById('reloadModal').style.display = 'block';
        });
        actionsCell.appendChild(reloadBtn);
    }

    actionsCell.appendChild(deleteWeaponBtn);
    row.appendChild(actionsCell);

    document.getElementById('weapons-tbody').appendChild(row);
    equippedCheckbox.addEventListener('change', function () {
        // Directly reference useBtn here
        useBtn.disabled = !this.checked;
    });

    // Event listener for "Use" button
    useBtn.addEventListener('click', function () {
        if (weapon.range === 'Ranged' && weapon.ammo > 0) {
            weapon.ammo--; // Decrease ammo by 1
            ammoCell.textContent = weapon.ammo; // Update the ammo cell text
            saveData(); // Save the updated playerData to localStorage or wherever it's stored
            console.log(weapon.ammo)
            // If ammo is 0, disable the use button
            if (weapon.ammo === 0) {
                useBtn.disabled = true;
            }
        }
    });

    deleteWeaponBtn.addEventListener('click', function () {
        // Confirm deletion
        if (confirm("Are you sure you want to delete this weapon?")) {
            deleteItem(weapon, 'weapons');
        }
    });

    if (weapon.specialAbility === true) {
        createSpecialAbility(weapon, 'weapons')
    }
}

function addItemToTable(item) {
    const row = document.createElement('tr');
    row.setAttribute('data-item-name', item.name);

    const nameCell = document.createElement('td');
    nameCell.textContent = item.name;
    nameCell.style.width = '50%';
    nameCell.setAttribute('title', item.description);
    row.appendChild(nameCell);


    const categoryCell = document.createElement('td');
    categoryCell.textContent = item.category;
    categoryCell.style.width = '20%';
    row.appendChild(categoryCell);


    const quantityCell = document.createElement('td');
    quantityCell.textContent = item.quantity;
    quantityCell.style.width = '10%';
    row.appendChild(quantityCell);

    const equippedCell = document.createElement('td');
    const equippedCheckbox = document.createElement('input');
    equippedCheckbox.type = 'checkbox';
    equippedCheckbox.checked = item.equipped;
    equippedCheckbox.className = 'equippedCheckbox';
    equippedCheckbox.id = `equipped-${item.name}`;
    equippedCell.appendChild(equippedCheckbox)
    row.appendChild(equippedCell);

    const actionCell = document.createElement('td');
    actionCell.style.width = '20%';
    const deleteItemBtn = document.createElement('button');
    deleteItemBtn.innerHTML = '&times;'
    deleteItemBtn.className = 'deleteBtn';
    actionCell.appendChild(deleteItemBtn);
    row.appendChild(actionCell);

    document.getElementById('inventory-tbody').appendChild(row);
    deleteItemBtn.addEventListener('click', function () {
        // Confirm deletion
        if (confirm("Are you sure you want to delete this item?")) {
            deleteItem(item, 'inventory');
        }
    });

    if (item.specialAbility === true) {
        createSpecialAbility(item, 'inventory')
    }
}

function createSpecialAbility(item, location) {
    const specialAbilityContainer = document.getElementById(location + 'specialAbility-container');
    if (specialAbilityContainer) {

        const existingAbility = specialAbilityContainer.querySelector(`div[data-item-name="${item.specialAbilityName}"]`);
        if (existingAbility) {
            return; // Stop the function execution if the special ability already exists
        }


        const specialAbility = document.createElement('div');
        specialAbility.setAttribute('data-item-name', item.specialAbilityName);
        const name = document.createElement('h3');
        name.textContent = item.specialAbilityName;
        specialAbility.appendChild(name);
        const from = document.createElement('p');
        from.innerHTML = `From: <em>${item.name}</em>`
        specialAbility.appendChild(from);

        const p = document.createElement('p');
        p.innerHTML = `
            <p>${item.specialAbilityDesc } </p>
            <strong>Target:</strong> ${item.target} <br>
            <strong>Effect:</strong> ${item.effectChoice}s <br>
            <strong>Effects:</strong> ${item.effects} <br>
            <strong>Total Uses:</strong> ${item.totalUses} <br> 
            <strong>Remaining Uses:</strong> ${item.remainingUses}
            </p>
        `;
        specialAbility.appendChild(p);

        const useBtn = document.createElement('button');
        useBtn.textContent = 'Use';
        specialAbility.appendChild(useBtn);

        // Apply styles based on the effectChoice
        if (item.effectChoice === "Aid") {
            specialAbility.className = "specialAbility aid";
            useBtn.className = 'specialAbilityUseBtn aid';
        } else {
            specialAbility.className = "specialAbility harm";
            useBtn.className = 'specialAbilityUseBtn harm';

        }

        specialAbilityContainer.appendChild(specialAbility);
    } else {
        console.log(`No special ability container... ${location}`);
    }
}

// function deleteItem(item, location) {
//     if (!item || !item.name) {
//         console.error("Invalid item passed to deleteItem.");
//         return;
//     }

//     console.log(`Attempting to delete item: ${item.name}`);
//     const tbodyQuery = `#${location}-tbody`;

//     // Safely filter out the item from the correct list based on location
//     if (playerData[location] && Array.isArray(playerData[location])) {
//         playerData[location] = playerData[location].filter(i => i.name !== item.name);
//     } else {
//         console.error(`playerData.${location} is not initialized correctly.`);
//         return;
//     }

//     // Remove the corresponding row in the table
//     const rows = document.querySelectorAll(`${tbodyQuery} tr[data-item-name='${item.name}']`);
//     rows.forEach(row => row.remove());

//     const idQuery = `#${location}specialAbility-container`;
//     // Also remove the corresponding special ability div
//     const specialAbilityDiv = document.querySelector(`${idQuery} [data-item-name='${item.name}']`);
//     if (specialAbilityDiv) {
//         specialAbilityDiv.remove();
//     } else {
//         console.log("No special ability div found.");
//     }

//     saveData(); // Save the updated playerData
// }

// function deleteItem(item, location) {
//     if (!item) {
//         console.error("Invalid item name passed to deleteItem.");
//         return;
//     }
//     console.log(`Attempting to delete item: ${item.name}`);
//     const tbodyQuery = `#${location}-tbody`;

//     // Safely filter out the item from the playerData.items
//     if (playerData.items && Array.isArray(playerData.items)) {
//         const previousLength = playerData.items.length;
//         playerData.items = playerData.items.filter(i => i.name !== item.name);
//         const newLength = playerData.items.length;

//         if (previousLength === newLength) {
//             console.log("No item was found with that name.");
//             return;
//         }

//         // Remove the corresponding row from the UI
//         const inventoryRows = document.querySelectorAll(`${tbodyQuery} tr[data-item-name='${item.name}']`);
//         console.log(inventoryRows)
//         if (inventoryRows.length > 0) {
//             inventoryRows.forEach(row => row.remove());
//             console.log("Item row removed from table.");
//         } else {
//             console.log("No item row found to remove.");
//         }

//         // Optionally, if special abilities are displayed elsewhere in the UI, also remove them
//         const specialAbilityDiv = document.querySelector(`#${location}specialAbility-container [data-item-name='${item.name}']`);
//         if (specialAbilityDiv) {
//             specialAbilityDiv.remove();
//             console.log("Special ability div removed.");
//         } else {
//             console.log("cannot find special ability div, you div!")
//         }

//         saveData(); // Save the updated playerData
//     } else {
//         console.error(`playerData.items is not initialized correctly.`);
//     }
// }

function deleteItem(item, location) {
    if (!item || !item.name) {
        console.error("Invalid item name passed to deleteItem.");
        return;
    }
    
    console.log(`Attempting to delete item: ${item.name}`);
    const tbodyQuery = `#${location}-tbody`;
    const safeName = CSS.escape(item.name);

    // Safely filter out the item from the playerData.items
    if (playerData.items && Array.isArray(playerData.items)) {
        playerData.items = playerData.items.filter(i => i.name !== item.name);
        const updatedItems = playerData.items.filter(i => i.name !== item.name).length;

        // Remove the corresponding row from the UI
        const inventoryRows = document.querySelectorAll(`${tbodyQuery} tr[data-item-name='${safeName}']`);
        console.log(inventoryRows);
        if (inventoryRows.length > 0) {
            inventoryRows.forEach(row => row.remove());
            console.log("Item row removed from table.");
        } else {
            console.log("No item row found to remove.");
        }


    const safeSpecialName = CSS.escape(item.specialAbilityName);
        // Optionally, if special abilities are displayed elsewhere in the UI, also remove them
        const specialAbilityDiv = document.querySelector(`#${location}specialAbility-container [data-item-name='${safeSpecialName}']`);
        console.log(specialAbilityDiv);
        if (specialAbilityDiv) {
            specialAbilityDiv.remove();
            console.log("Special ability div removed.");
        } else {
            console.log("No special ability div found.");
        }

        saveData(); // Save the updated playerData
        updateUI(); // Ensure the UI is updated immediately
    } else {
        console.error(`playerData.items is not initialized correctly.`);
    }
}

