INSERT INTO public."User"("user_id", "email", "firstname", "lastname", "User_Has_Role", "User_Presents_Session_FK", "auth_user_id")

VALUES
(198,'guido@psf.com', 'Guido', 'Van Rossum', 2, 1, 123456789),
(200,'gosling.coretto@aws', 'James', 'Gosling', 2, 2, 987654321),
(199,'bjrne@bell.labs', 'Bjarne', 'Stroustrup', 2, 3, 987651234);

INSERT INTO public."Session"("session_id", "name", "date", "time", "summarization", "Session_PresentedBy_User")

VALUES
(1, 'Python Disaster 2x to 3.x', '2021-08-31', '15:30:00+00', '{Why did the Python3 transition break backwards compatibility?}', 198),
(2, 'C++ 2021 Chavez', '2021-08-31', '12:00:00+00', '{Will C++ 2021 specification defeat the Chavismo?}', 199),
(3, 'Java has not died', '2021-08-10', '12:00:00+00', '{Minecraft was written in Java. What else do you need?}', 200);

INSERT INTO public."SessionUpload"("session_upload_id", "url", "Upload_For_Session_FK", "Upload_IsOf_UploadType_FK")

VALUES
(1, 'https://pbs.twimg.com/profile_images/439154912719413248/pUBY5pVj_400x400.png', 1, 1),
(2, 'https://pbs.twimg.com/profile_images/889823640765607936/Rk1v-ys1_400x400.jpg', 2, 1),
(3, 'https://pbs.twimg.com/profile_images/1410016948977422337/rKU8iR89_400x400.png', 3, 1);

INSERT INTO public."UserUpload"("user_upload_id", "url", "Upload_For_User_FK", "Upload_IsOf_UploadType_FK")

VALUES
(1, 'https://pbs.twimg.com/profile_images/424495004/GuidoAvatar_400x400.jpg', 198, 1),
(2, 'https://pbs.twimg.com/profile_images/436507482/2_1__400x400', 199, 1),
(3, 'https://pbs.twimg.com/profile_images/1060661254853865472/Oj2V9k6Y.jpg', 200, 1);
