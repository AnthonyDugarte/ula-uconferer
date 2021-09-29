INSERT INTO public."User"("user_id", "email", "firstname", "lastname", "User_Has_Role", "User_Presents_Session_FK", "auth_user_id")
 VALUES
 (201,'martin.odersky@epfl.ch', 'Martin', 'Odersky', 2, 4, 99887766),
 (202, 'mikerberry@newsrooms.fb.com', 'Mike', 'Ruberry', 2, 5, 999999999),
 (203, 'meredydd@senatahouse.org', 'Meredydd', 'Luff', 2, 6, 898989898989),
 (204, 'sangbincho@anyscale.com', 'SangBin', 'Cho', 2, 7, 12121212121),
 (205, 'w.s.zeeff@@fsw.leidenuniv.nl', 'Sebastiaan', 'Zeeff', 2, 8, 17171177171),
 (206, 'errasmussen@gmail.com', 'Erik', 'Rasmussen', 2, 9, 6666677777788),
 (207, 'mhamilton@thinkmill.com', 'Mitchell', 'Hamilton', 2, 10, 123512365),
 (208, 'jed@thinkmaill.com', 'Jed', 'Watson', 2, 11, 8765436871213);

INSERT INTO public."Session"("session_id", "name", "start_at", "end_at", "summarization", "Session_PresentedBy_User")
 VALUES
 (4, 'A Scala 3 update', '2021-09-28T13:00:00.105Z', '2021-09-28T14:00:00.105Z', 'Martin will report on recent progress and the current state of Scala 3. In this talk, Martin also will lay out the next steps of the planned transition and how the community can help in implementing them.', 201),
 (5, 'From Numpy to PyTorch API Compatibility', '2021-09-28T14:00:00.105Z', '2021-09-28T14:30:00.105Z', 'NumPy has grown to be a vital part of the data science workflow for everyone from astrophysicists to zoologists. This talk is about how PyTorch approaches being “NumPy-compatible,” and why the PyTorch community thinks that’s important, why it can be challenging, and why sometimes it’s necessary to be divergent from NumPy’s behavior', 202),
 (6, 'Writing Good Docs for Developers', '2021-09-28T14:30:00.105Z', '2021-09-28T15:00:00.105Z', 'If you are building something for developers, you want it to get used. This means your potential users need to find your library, framework, or API. They need to work out whether it is useful for them, learn how to use it, and solve problems they encounter along the way. All these things depend on your developer docs!', 203),
 (7, 'Data Processing on Ray', '2021-09-28T15:00:00.105Z', '2021-09-28T15:30:00.105Z', 'Machine learning and data processing applications continue to drive the need to develop scalable Python applications. Ray is a distributed execution engine that enables programmers to scale up their Python applications. This talk will cover some of the challenges we faced and key architectural changes we made to Ray over the past year to support a new set of large scale data processing workloads.', 204),
 (8, 'Magic: How Python inserts "self" into methods', '2021-09-28T15:30:00.105Z', '2021-09-28T16:00:00.105Z', 'In this talk, I want to entice you to look beyond the Python high-level interface into the wonderful landscape of its data model. I will do that by explaining one of Python most magical features: The automatic insertion of self into methods. Often, to beginners, the insertion of the instance as the first argument to methods is explained as something that Python just does for you: Don not worry about it, it just happens!.', 205),
 (9, 'Modern Forms in React', '2021-09-28T16:00:00.105Z', '2021-09-28T16:30:00.105Z', 'If the new React Context API and Suspense killed Redux (they didn not), surely Hooks kill the need for a form library, right? Well, not exactly. Managing form state is more than just holding your current values in state; it is about sync and async validation errors, and much more! But that does not mean that Hooks are irrelevant to the situation. Hooks make building forms in React easier than ever before.', 206),
 (10, 'Building with Monorepos', '2021-09-28T16:30:00.105Z', '2021-09-28T17:00:00.105Z', 'Monorepos are everywhere in the React community from design systems and apps to open source libraries. Being able to work on multiple packages together is powerful, but it is not without its problems. Lets learn how to solve these problems by exploring the evolution of Emotions monorepo. If you are not familiar with monorepos, don not worry. Mitchell will cover what they are, when and why you would want to use one and how to get started with them!', 207),
 (11, 'The Value of Open Source', '2021-09-28T17:00:00.105Z', '2021-09-28T17:30:00.105Z', 'Jed wraps up ReactConf AU by discussing the sustainability of open source, the value OSS creates for us all individually and as a collective, and then proposes some small steps we can all take to ensure the future of our vibrant community.', 208);


INSERT INTO public."SessionUpload"("session_upload_id", "url", "Upload_For_Session_FK", "Upload_IsOf_UploadType_FK")
VALUES
(4, 'https://pbs.twimg.com/profile_images/3310435403/dc47c969494d3279783610ba3298f58b_400x400.png', 4, 1), 
(5, 'https://youtu.be/Z0w_pITUTyU', 4, 2),
(6, 'https://pbs.twimg.com/profile_images/1333824350672154624/_P1hFKa3_400x400.jpg', 5, 1),
(7, 'https://youtu.be/5wk13yle5GA', 5, 2),
(8, 'https://pbs.twimg.com/profile_images/3310435403/dc47c969494d3279783610ba3298f58b_400x400.png', 6, 1),
(9, 'https://youtu.be/eWaWvUhpseM', 6, 2),
(10, 'https://pbs.twimg.com/profile_images/3310435403/dc47c969494d3279783610ba3298f58b_400x400.png', 7, 1),
(11, 'https://youtu.be/DNLqvdov_J4', 7, 2),
(12, 'https://pbs.twimg.com/profile_images/3310435403/dc47c969494d3279783610ba3298f58b_400x400.png', 8, 1),
(13, 'https://youtu.be/ANLjBsWHshc', 8, 2),
(14, 'https://yt3.ggpht.com/ytc/AKedOLTN3vVLUejr_AhIps3zxVcgcgkAYAHL2s5lKDxB=s48-c-k-c0x00ffffff-no-rj', 9, 1),
(15, 'https://youtu.be/v1JAUiqskiw', 9, 2),
(16, 'https://yt3.ggpht.com/ytc/AKedOLTN3vVLUejr_AhIps3zxVcgcgkAYAHL2s5lKDxB=s48-c-k-c0x00ffffff-no-rj', 10, 1),
(17, 'https://youtu.be/Q5Nw3zdpNfM', 10, 2),
(18, 'https://yt3.ggpht.com/ytc/AKedOLTN3vVLUejr_AhIps3zxVcgcgkAYAHL2s5lKDxB=s48-c-k-c0x00ffffff-no-rj', 11, 1),
(19, 'https://youtu.be/AdVQdXS6ooQ', 11, 2);


INSERT INTO public."UserUpload"("user_upload_id", "url", "Upload_For_User_FK", "Upload_IsOf_UploadType_FK")
VALUES
(4, 'https://pbs.twimg.com/profile_images/673909115/Martin_400x400.JPG', 201, 1),
(5, 'https://pbs.twimg.com/profile_images/1370122157603233793/SSJjPuUV_400x400.jpg', 202, 1),
(6, 'https://pbs.twimg.com/profile_images/1234788067770327040/C47wfcx3_400x400.jpg', 203, 1),
(7, 'https://media-exp1.licdn.com/dms/image/C5603AQFLlhGDE6zMBQ/profile-displayphoto-shrink_800_800/0/1601049966445?e=1638403200&v=beta&t=an8qvFjsVH_SRagenv5AcTCE4EvWMUkr0LJjFLWHph8', 204, 1),
(9, 'https://media-exp1.licdn.com/dms/image/C5603AQG3My39rFbUjA/profile-displayphoto-shrink_200_200/0/1607791327924?e=1638403200&v=beta&t=SEzIG-XUBU45kPEFZ0QFmu1TCCNriCbmkB3sdGziqdw', 205, 1),
(10, 'https://pbs.twimg.com/profile_images/1239587498344566784/1BxVOYSi_400x400.jpg', 206, 1),
(11, 'https://pbs.twimg.com/profile_images/1067024085610164224/2XfyJBMT_400x400.jpg', 207, 1),
(12, 'https://pbs.twimg.com/profile_images/694401960397570049/uIEsJzcv_400x400.jpg', 208, 1);
