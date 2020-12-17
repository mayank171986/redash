import React, { useState, useCallback } from "react";
import Button from "antd/lib/button";
import DynamicComponent from "@/components/DynamicComponent";
import { UserProfile } from "@/components/proptypes";
import User from "@/services/user";
import PasswordLinkAlert from "./PasswordLinkAlert";

type Props = {
    user: UserProfile;
};

export default function ResendInvitationForm(props: Props) {
  const { user } = props;

  const [loading, setLoading] = useState(false);
  const [passwordLink, setPasswordLink] = useState(null);

  const resendInvitation = useCallback(() => {
    setLoading(true);

    User.resendInvitation(user)
      .then(passwordLink => {
        setPasswordLink(passwordLink);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  return (
    // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
    <DynamicComponent name="UserProfile.ResendInvitationForm" {...props}>
      <Button className="w-100 m-t-10" onClick={resendInvitation} loading={loading}>
        Resend Invitation
      </Button>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'UserProfile' is not assignable to type 'neve... Remove this comment to see the full error message */}
      <PasswordLinkAlert user={user} passwordLink={passwordLink} afterClose={() => setPasswordLink(null)} />
    </DynamicComponent>
  );
}