import React, { useEffect } from "react";
import HeroSection from "./HeroSection";
import Team from "./Team";
import OrgChat from "./OrgChats";
import Link from "next/link";
import { useRouter } from "next/router";
import { APP_DOMAIN } from "@/constants/app.constants";
import PastRecordings from "./PastRecordings";
import { getOrganization } from "@/api/org.api";
import OrgMembers from "./OrgMembers";
import { getethAddress } from "@/hooks/getAddress.hook";
import Modal from "../styleComps/Modal";
import LighthouseContainer from "../lighthouse/LighthouseContainer";
import CrossChainBridge from "../crosschainbridge/CrossChainBridge";

const OrgContainer = ({ orgName, address }) => {
  const [team, setTeam] = React.useState([]);
  const [meetLink, setMeetLink] = React.useState("");
  const router = useRouter();
  const [org, setOrg] = React.useState();
  const [myAddress, setMyAddress] = React.useState();

  const getOrgs = async () => {
    if (orgName) {
      const org = await getOrganization(orgName);
      if (org) {
        setOrg(org);
        setTeam(org.team);
      }
    }
  };
  useEffect(() => {
    getOrgs();
  }, [orgName]);

  useEffect(() => {
    const setAddress = async () => {
      const address = await getethAddress();
      setMyAddress(address);
    };
    setAddress();
  });
  console.log(myAddress);
  console.log(org);
  return (
    <div className="px-4">
      <HeroSection
        orgName={orgName}
        tagline={org?.orgAddress}
        image={org?.logo}
      />
      <div className="flex flex-col sm:flex-row">
        <div className="w-full md:w-1/2">
          <div className="">
            <h1 className="text-2xl mx-auto w-fit my-10"></h1>
            <div className="collapse">
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-base-200 text-primary-content peer-checked:bg-base-300 peer-checked:text-secondary-content">
                Click here to show/hide Members
              </div>
              <div className="collapse-content bg-base-300 text-primary-content peer-checked:bg-base-300 peer-checked:text-secondary-content">
                <OrgMembers members={org?.members} />
              </div>
            </div>
          </div>
          <div className="my-5 py-2 w-5/6 flex flex-row flex-wrap mx-auto ">
            {/* <div className="flex flex-row w-full"> */}
            {org?.hostAddress == myAddress && (
              <div className="host-controls ">
                <Link href={"/sbt"}>
                  <button className=" btn  bg-[#f71953] text-white  text-xs  m-3 w-48 ">
                    Add a member
                  </button>
                </Link>
              </div>
            )}
            <div className="host-controls ">
              <Modal
                type={"joinTeam"}
                orgAddress={org?.orgAddress}
                title={"Join team"}
                clickText={"Join team"}
              />
            </div>

            <div className="host-controls ">
              <Modal
                type={"createTeam"}
                orgAddress={org?.orgAddress}
                title={"Create a team"}
                clickText={"Create team"}
              />
            </div>
            <div className="host-controls ">
              <button
                className=" btn  bg-[#f71953] text-white  text-xs  m-3 w-48 "
                onClick={() => {
                  router.push("/stream/" + orgName);
                }}
              >
                Start A LiveStream
              </button>
            </div>

            {/* <hr /> */}
            <div className="host-controls ">
              <button
                className=" btn  bg-[#f71953] text-white  text-xs  m-3 w-48 "
                onClick={() => {
                  setMeetLink("/meeting/" + orgName);
                  console.log(meetLink);
                }}
              >
                Generate a meeting link
              </button>
            </div>
            {meetLink && (
              <Link className=" m-2 link link-accent" href={meetLink}>
                {" "}
                Start a meeting!{" "}
              </Link>
            )}
            <div className="host-controls ">
              <button
                className=" btn  bg-[#f71953] text-white  text-xs  m-3 w-48 "
                onClick={() => {
                  router.push("/mint/" + orgName);
                }}
              >
                Mint Your Video NFT
              </button>
            </div>
            <div className="host-controls ">
              <button
                className=" btn  bg-[#f71953] text-white  text-xs  m-3 w-48 "
                onClick={() => {
                  router.push("/upload/" + orgName);
                }}
              >
                Upload/View Video Assets
              </button>
            </div>
            <div className="host-controls ">
              {/* The button to open modal */}
              <label htmlFor="my-modal" className="btn  bg-[#f71953] text-white  text-xs  m-3 w-48  ">
                Cross-chain token exchange
              </label>

              {/* Put this part before </body> tag */}
              <input type="checkbox" id="my-modal" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg mb-4">
                    Cross-chain token exchange
                  </h3>
                  <br />
                  <CrossChainBridge />
                  <div className="modal-action">
                    <label htmlFor="my-modal" className="btn bg-[#f71953] text-white  text-xs  m-3 w-48  ">
                      Close
                    </label>
                  </div>
                </div>
              </div>
            </div>
             <div className="host-controls ">
              <button
                className=" btn  bg-[#f71953] text-white  text-xs  m-3 w-48 "
              >
                Transfer tokens
              </button>
            </div>
            {/* </div> */}
          </div>
          <h1 className="text-2xl mx-auto w-fit my-10">Teams</h1>
          <Team team={org?.teams} orgName={orgName} />

          <div className="my-5 py-2 w-full flex flex-col ">
            {/* <h1 className="text-2xl mx-auto my-4">Past recordings</h1> */}
            {/* <PastRecordings recordings={org?.meet_recordings} /> */}
            {/* <div className="mx-auto my-4">
              Wanna stream some stuff to your organization? Click here to stream
              using Livepeer!
            </div>
            <div className="mx-auto my-4">
              Need a place to store files permanently with complete security?
              CLick here and store your files using LightHouse!
            </div> */}
            <LighthouseContainer />
          </div>
        </div>
        <div className="mx-auto w-1/2 px-4 mx-4">
          <OrgChat
            orgAddress={org?.orgAddress}
            orgChatss={org?.chats}
            orgname={orgName}
          />
        </div>
      </div>
    </div>
  );
};

export default OrgContainer;
