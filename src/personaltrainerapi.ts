import type { CustomerData, TrainingData } from "./types";

export function getCustomers() {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers");

            return response.json();
        })
}

export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings");

            return response.json();
        })
}

export function addCustomer(customer: CustomerData) {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding customer");

            return response.json();
        })
}

export function updateCustomer(url: string, customer: CustomerData) {
    return fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when updating customer");

            return response.json();
        })
}

export function deleteCustomer(url: string) {
    return fetch(url, { method: 'DELETE' })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting customer");
        })
}

export function addTraining(training: TrainingData) {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(training)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding training");

            return response.json();
        })
}

export function deleteTraining(id: number) {
    return fetch(import.meta.env.VITE_API_URL + "/trainings/" + id, { method: 'DELETE' })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting training");
        })
}