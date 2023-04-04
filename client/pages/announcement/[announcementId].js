import { Icon } from "@iconify/react";
import Axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import useSWR, { useSWRConfig } from "swr";
import { useAuthDispatch } from "../../context/auth";

dayjs.extend(relativeTime);

function Announcement() {
    const router = useRouter();
    const announcementId = router.query.announcementId;
    const [announcementImage, setAnnouncementImage] = useState();
    const [commentText, setCommentText] = useState("");
    const { mutate } = useSWRConfig();
    const dispatch = useAuthDispatch();

    const {
        data: announcement,
        error: errorAnnouncement,
        isValidating: isValidatingAnnouncement,
    } = useSWR(`http://localhost:3001/announcement/${announcementId}`);

    useEffect(() => {
        dispatch(
            "CHANGE_TITLE",
            `Announcement - ${
                announcement?.barangayName ? announcement.barangayName : "GSO"
            }`
        );
        dispatch("HAS_BUTTON_TRUE");
        dispatch("CHANGE_PATH", "/announcements");
    }, [announcement?.barangayName]);

    const {
        data: comments,
        error: errorComments,
        isValidating: isValidatingComments,
    } = useSWR(
        `http://localhost:3001/announcement/getcomments/${announcementId}`
    );

    const comment = async (e) => {
        e.preventDefault();
        if (commentText) {
            const data = {
                text: commentText,
            };
            await Axios.post(
                `http://localhost:3001/announcement/comment/${announcementId}`,
                data
            ).then((res) => {
                mutate(
                    `http://localhost:3001/announcement/getcomments/${announcementId}`
                );
                setCommentText("");
            });
        } else {
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="p-4 md:p-8">
                {announcement ? (
                    <>
                        <p className="text-sm text-gray-600">
                            Posted on:{" "}
                            {moment(announcement?.createdAt).format(
                                "MMM D, YYYY - h:mmA"
                            )}
                        </p>
                        <p className="my-4 text-xl font-medium">
                            {announcement?.announcementText}
                        </p>
                        {announcement?.announcementImageUrl && (
                            <div className="w-full max-w-xl bg-black border ">
                                <Image
                                    src={announcement.announcementImageUrl}
                                    alt="announcement image"
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    objectFit="contain"
                                />
                            </div>
                        )}

                        <p className="mt-4 text-sm text-gray-600">
                            {comments?.length > 1 || comments?.length == 0
                                ? comments?.length + " comments"
                                : comments?.length + " comment"}
                        </p>

                        <hr className="my-4 " />

                        <form onSubmit={comment} className="mb-6 ">
                            <p>Add a comment</p>
                            <input
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                type="text"
                                placeholder="Write a comment..."
                                className="w-full px-3 py-2 border"
                            />
                            <input type="submit" hidden />
                        </form>

                        <div className="space-y-4">
                            {comments?.map((comment, index) => {
                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col min-w-[180px]"
                                    >
                                        <div className="flex items-start mb-1">
                                            <Avatar
                                                name={comment.username}
                                                size={38}
                                                textSizeRatio={2}
                                                className="mr-2 rounded-full "
                                            />
                                            <div className="flex flex-col items-end">
                                                <div className="px-3 mb-1 py-2 border min-w-[180px] max-w-md break-words">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <p className="text-sm font-medium">
                                                            {comment.username}
                                                        </p>
                                                        <p className="text-sm text-gray-600">
                                                            {comment.barangayName
                                                                ? comment.barangayName
                                                                : "GSO"}
                                                        </p>
                                                    </div>

                                                    <p>{comment.commentText}</p>
                                                </div>
                                                <p className="text-xs text-gray-600 ">
                                                    {dayjs(
                                                        comment.createdAt
                                                    ).fromNow()}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                ) : (
                    <p>Nothing here</p>
                )}
            </div>
        </div>
    );
}

export default Announcement;
