<template>
    <VDialog v-model="dialog" class="pt-8" style="align-items: start; width: 350px;">
        <VCard :title="title || 'Confirm'">
            <VCardText>{{ message || 'Are you sure you want to continue?' }}</VCardText>
            <VCardActions>
                <VSpacer />
                <VBtn color="on-secondary" @click.native="cancel">
                    CANCEL
                </VBtn>
                <VBtn @click.native="agree">
                    CONFIRM
                </VBtn>
            </VCardActions>
        </VCard>
    </VDialog>
</template>
  
<script>
export default {
    name: "ConfirmationDialog",
    data() {
        return {
            dialog: false,
            resolve: null,
            reject: null,
            message: null,
            title: null,
        };
    },

    methods: {
        open({ title, message }) {
            this.dialog = true;
            this.title = title;
            this.message = message;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },

        close() {
            this.dialog = false;
        },

        agree() {
            this.resolve(true);
        },

        cancel() {
            this.resolve(false);
            this.close()
        },
    },
};
</script>