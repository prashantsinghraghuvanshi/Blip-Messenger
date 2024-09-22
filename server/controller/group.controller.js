import express from 'express';
import Group from "../models/user/group.model.js"

const router = express.Router();

// Create a new group
export const createGroup = async(req,res)=>{
    try {
        const {  name, description } = req.body;
        const group = new Group({  name, description });
        await group.save();
        res.status(201).json(group);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

// Add a member to the group
// router.post('/groups/:groupId/members', async (req, res) => {

// });
export const addMember = async(req,res)=>{
    try {
        const { id:groupId } = req.params;
        const { userId, role, permissions } = req.body;
        const group = await Group.findOne({ groupId });
        if (!group) {
          return res.status(404).json({ error: 'Group not found' });
        }
        group.members.push({ userId, role, permissions });
        await group.save();
        res.status(200).json(group);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }


}

// Send a message in the group
// router.post('/groups/:groupId/messages', async (req, res) => {

// });

export const sendMessage = async(req,res)=>{
    try {
        const { id:groupId } = req.params;
        const {  senderId, content } = req.body;
        const group = await Group.findOne({ groupId });
        if (!group) {
          return res.status(404).json({ error: 'Group not found' });
        }
        group.messages.push({ senderId, content });
        await group.save();
        res.status(200).json(group);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

// Get group details
// router.get('/groups/:groupId', async (req, res) => {

// });

export const groupDetails = async(req,res)=>{
    try {
        const { id: groupId } = req.params;
        const group = await Group.findOne(groupId );
        if (!group) {
          return res.status(404).json({ error: 'Group not found' });
        }
        res.status(200).json(group);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

}

export default router;
