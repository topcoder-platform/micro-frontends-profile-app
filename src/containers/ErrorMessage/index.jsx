import actions from "../../actions";
import React from "react";
import PT from "prop-types";
import { connect } from "react-redux";
import ErrorMessage from "components/ErrorMessage";

function ErrorMessageContainer({ error, clearError }) {
  return (
    <div>
      {error ? (
        <ErrorMessage
          title={error.title}
          details={error.details}
          onOk={() => clearError()}
        />
      ) : undefined}
    </div>
  );
}

ErrorMessageContainer.defaultProps = {
  error: null,
};

ErrorMessageContainer.propTypes = {
  clearError: PT.func.isRequired,
  error: PT.shape({
    title: PT.string,
    details: PT.string,
  }),
};

const mapStateToProps = (state) => {
  return {
    error: state?.profile?.errors?.alerts[0],
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearError: () => {
    dispatch(actions.profile.clearError());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorMessageContainer);
