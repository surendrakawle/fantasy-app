import asyncio
import websockets
import json
import base64
import cv2
import numpy as np
import mediapipe as mp

mp_face = mp.solutions.face_mesh
face_mesh = mp_face.FaceMesh(
    max_num_faces=1,
    refine_landmarks=True,
    min_detection_confidence=0.6,
    min_tracking_confidence=0.6
)

def p(lm, i):
    return {"x": lm[i].x, "y": lm[i].y}

async def face_server(websocket):
    async for message in websocket:
        # Decode base64 frame
        img_bytes = base64.b64decode(message)
        np_arr = np.frombuffer(img_bytes, np.uint8)
        frame = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = face_mesh.process(rgb)

        data = {}

        if result.multi_face_landmarks:
            lm = result.multi_face_landmarks[0].landmark
            data = {
                "face_center": p(lm,168),
                "nose": p(lm,1),
                "left_eye_u": p(lm,159),
                "left_eye_l": p(lm,145),
                "right_eye_u": p(lm,386),
                "right_eye_l": p(lm,374),
                "left_brow": p(lm,65),
                "right_brow": p(lm,295),
                "mouth_top": p(lm,13),
                "mouth_bottom": p(lm,14),
                "mouth_left": p(lm,61),
                "mouth_right": p(lm,291),
            }

        await websocket.send(json.dumps(data))

async def main():
    async with websockets.serve(face_server, "0.0.0.0", 8765):
        print("✅ Face server running (WebSocket)")
        await asyncio.Future()

asyncio.run(main())
