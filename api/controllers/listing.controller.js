import Listing from "../models/listing.model.js";

export const createlisting = async (req, res, next) => {
    try {
        console.log("🔵 createlisting function triggered!");
        console.log("🟡 Incoming Request Body:", req.body);

        if (!req.user) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        console.log("🟡 User Info from Token:", req.user);

        // Ensure the discountPrice isn't greater than the regular price
        if (req.body.discountPrice && req.body.discountPrice >= req.body.regularprice) {
            return res.status(400).json({
                success: false,
                message: "Discount price must be lower than regular price.",
            });
        }

        // Attach user ID from token
        const newListing = { ...req.body, userRef: req.user.id };

        const listing = await Listing.create(newListing);
        console.log("✅ Listing Created:", listing);

        return res.status(201).json(listing);
    } catch (error) {
        console.error("🔴 Error Creating Listing:", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
};
