import {FETCH_INVITATIONS, DECLINE_INVITATION, ACCEPT_INVITATION, ADD_TEAM} from "./types";
import { serverDomain } from "../ipconfig"

export const fetchInvitations = () => dispatch => {
    fetch(serverDomain + "/getInvitations")
        .then(res => res.json())
        .then(invitations => dispatch({
            type: FETCH_INVITATIONS,
            payload: invitations
        }));
};

export const acceptInvitation = invitation => dispatch => {
    dispatch({
        type: ACCEPT_INVITATION,
        payload: invitation
    });
    dispatch({
        type: ADD_TEAM,
        payload: invitation
    });
};

export const declineInvitation = invitation => dispatch => {
    dispatch({
        type: DECLINE_INVITATION,
        payload: invitation
    });
};