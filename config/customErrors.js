    module.exports = {
    defaultError: {
      name: "somethingWentWrong",
      message: "Something went wrong please try again later",
      private: true,
      status: 500
    },
    clientNotFound: {
      name: "clientNotFound",
      message: "Client not found",
      private: false,
      status: 404
    },
    providerNotFound: {
      name: "providerNotFound",
      message: "Provider not found",
      private: false,
      status: 404
    },
    duplicationDetected: {
      name: "duplicationDetected",
      private: false,
      status: 409
    }
};
