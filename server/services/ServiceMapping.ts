let mapping;

function createMapping() {
    mapping = {

    };
}

function getService(service) {
    return mapping[service];
}

export default { createMapping, getService };
