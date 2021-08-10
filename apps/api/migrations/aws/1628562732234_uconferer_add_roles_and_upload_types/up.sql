BEGIN;

-- Create the Predefined Roles
INSERT INTO public."Role" (role_id, name) VALUES 
(1, 'Admin'),
(2, 'Presenter'),
(3, 'Attendee');

-- Create the predefined upload types
INSERT INTO public."UploadType" (upload_type_id, name) VALUES 
(1, 'Image'),
(2, 'Video');

END;
