<template>
    <div v-if="modalSubject == `il viaggio`" class="backgroundDeletionModal">
        <div class="customDeletionModal">
            <h1 class="mb-5 ">Vuoi eliminare {{ modalSubject }} ?</h1>
            <div class="d-flex justify-content-end">

                <button v-if="modalSubject == 'il viaggio'" class="btn border-danger me-1 deleteBtn"
                    @click="this.$emit('deleteConfirmation')">
                    Cancella
                </button>
                <button class="btn border-primary  backBtn" @click="closedModal()">
                    Annulla
                </button>
            </div>

        </div>
    </div>

    <div v-if="modalSubject == `l'attività`" class="backgroundDeletionModalMinus">
        <div class="customDeletionModal">
            <h1 class="mb-5 ">Vuoi eliminare {{ modalSubject }} ?</h1>
            <div class="d-flex justify-content-end">

                <button v-if="modalSubject == `l'attività`" class="btn border-danger me-1 deleteBtn"
                    @click="this.$emit('activityDeleteConfirmation')">
                    Cancella
                </button>
                <button class="btn border-primary  backBtn" @click="closedModal()">
                    Annulla
                </button>
            </div>

        </div>
    </div>


</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        closedModal() {
            this.$parent.deletionModal = false
        }
    },
    emits: ['deleteConfirmation', 'activityDeleteConfirmation'],
    props: { modalSubject: String }
}

</script>

<style lang="scss" scoped>
.customDeletionModal {
    background-color: white;
    z-index: 5;
    width: fit-content;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 30px;
    border-radius: 15px;
    box-shadow: 0 10px 5px 0 rgba(black, 0.2);

    .close {
        position: absolute;
        right: 30px;
        top: 20px;
        cursor: pointer;

        &:hover {
            transform: scale(1.1);
        }
    }

    [id^='searchbox-']>* {
        margin-top: 0 !important;
    }
}

.backgroundDeletionModalMinus {
    background: rgba(0, 0, 0, 0.24);
    z-index: 1000;
    width: 100vw;
    height: calc(100vh - 80px);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: -50px;
}

.backgroundDeletionModal {
    background: rgba(0, 0, 0, 0.24);
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
}

.deleteBtn {
    height: 38px;
    color: white;
    background-color: rgba(255, 0, 0, 0.387);

    &:hover {
        background-color: rgba(255, 0, 0, 0.65);
    }
}

.backBtn {
    height: 38px;
    color: white;
    background-color: rgba(0, 166, 255, 0.387);
    margin-right: 10px;

    &:hover {
        background-color: #3795bdc4;
    }
}

.btnContainer {
    display: flex;
    justify-content: end;
}
</style>
