import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import { useUsers } from "@/store/context/UserContext";
import { useMaterialTailwindController, setOpenEditProfile } from "@/context";
import { EditProfile } from "@/widgets/side-user";

export function ProfileAuth() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { currentUser, getProfile, logoutUser, getUserById } = useUsers();
  const [profile, setProfile] = React.useState({})

  React.useEffect(() => {
    if (!currentUser) {
      getProfile();
    }
  }, [currentUser])

  React.useEffect(() => {
    setProfile(currentUser)
  }, [currentUser])


  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="mx-3 mt-12 mb-8 flex flex-col gap-12">
        <EditProfile />
        <Card className="mx-3 -mt-8 mb-6 lg:mx-4">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                  src={profile?.pic}
                  alt="bruce-mars"
                  size="xl"
                  className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {profile?.username}
                  </Typography>
                  <Typography
                    variant="small"
                    className="font-normal text-blue-gray-600"
                  >
                    {profile?.fullName}
                  </Typography>
                </div>
              </div>
            </div>
            <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
              <ProfileInfoCard
                title="Profile Information"
                details={{
                  "location": profile?.address,
                  mobile: profile?.number,
                  email: profile?.email,
                }}
                action={
                  <Tooltip content="Edit Profile">
                    <PencilIcon
                      onClick={() => {
                        setOpenEditProfile(dispatch, true);
                      }}
                      className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                  </Tooltip>
                }
              />
            </div>

          </CardBody>
        </Card>
      </div>

    </>
  );
}

export default ProfileAuth;
