from fastapi import APIRouter
from app.services.maps_service import get_locations

router = APIRouter(
    prefix="/maps",
    tags=["Offline Maps"]
)


@router.get("/")
async def fetch_locations():

    return {
        "success": True,
        "locations": get_locations()
    }